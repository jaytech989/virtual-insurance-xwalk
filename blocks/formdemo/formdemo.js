
import  createField  from "../form/form-fields.js";

async function createForm(formHref) {
  // const { pathname, search } = new URL(formHref);
  const resp = await fetch(formHref);
  const json = await resp.json();

  const form = document.createElement("form");
  const h1element = document.getElementById("form-headline-1");
  if (h1element) {
    const h4element = document.createElement("h4");
    h4element.innerHTML = h1element.innerHTML;
    h1element.replaceWith(h4element);
    h4element.classList.add("form-headline-4");
  }
  // eslint-disable-next-line prefer-destructuring
  form.dataset.action = formHref.split(".json")[0];
  const fields = await Promise.all(
    json.data.map((fd) => createField(fd, form))
  );
  fields.forEach((field) => {
    if (field) {
      form.append(field);
    }
  });

  // group fields into fieldsets
  const fieldsets = form.querySelectorAll("fieldset");
  fieldsets.forEach((fieldset) => {
    form
      .querySelectorAll(`[data-fieldset="${fieldset.name}"`)
      .forEach((field) => {
        fieldset.append(field);
      });
  });

  return form;
}

async function calculateEMI() {
  const keys = ["principal", "years", "annualRate"];
  const inputval = document.getElementsByClassName("calValinput");
  for (let i = 0; i < keys.length; i++) {
    emiValue[keys[i]] = inputval[i].value; // Dynamic key
  }
  console.log(emiValue);

  const monthlyRate = emiValue.annualRate / 12 / 100;
  const totalMonths = emiValue.years * 12;
  const emi =
    (emiValue.principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);
  return Math.round(emi);
}

async function createOutputDiv() {
  const outputDiv = document.createElement("div");
  outputDiv.classList.add("outputdiv");
  const desc = document.createElement("p");
  desc.textContent = "Your EMI amount is";
  outputDiv.append(desc);
  const amountSpan = document.createElement("span");
  amountSpan.classList.add("emiamount");
  amountSpan.id = "emiamount";
  outputDiv.append(amountSpan);

  return outputDiv;
}

function validateForm(form) {

  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    const wrapper = field.closest('[data-fieldset]');
    const errorMsg = wrapper?.querySelector('.errorMsg');
    let fieldIsValid = true;

    // Validate checkbox
    if (field.type === 'checkbox' && !field.checked) {
      fieldIsValid = false;
    }

    // Validate radio group
    if (field.type === 'radio') {
      const group = form.querySelectorAll(`input[name="${field.name}"]`);
      const oneChecked = Array.from(group).some(r => r.checked);
      if (!oneChecked) {
        fieldIsValid = false;
      }
    }

    // Validate general input (text, email, etc.)
    if ((field.type !== 'checkbox' && field.type !== 'radio') && !field.value.trim()) {
      fieldIsValid = false;
    }

    // Show/hide error message
    if (errorMsg) {
      errorMsg.style.display = fieldIsValid ? 'none' : 'inline';
    }

    if (!fieldIsValid) {
      isValid = false;
    }
  });

  return isValid;
}


async function handleSubmit(form) {
  if (form.getAttribute('data-submitting') === 'true') return false;

  const submit = form.querySelector('button[type="submit"]');

  const isValid = validateForm(form);
  if (!isValid) return false;

  try {
    form.setAttribute('data-submitting', 'true');
    submit.disabled = true;

    console.log('Form submitted!');
    // Add your AJAX/fetch logic here if needed

    return true;
  } catch (e) {
    console.error('Submission error:', e);
    return false;
  } finally {
    form.setAttribute('data-submitting', 'false');
    submit.disabled = false;
  }
}


export default async function decorate(block) {
  const formLink = block.querySelector("a[href]").getAttribute('href');
  const mainWrapper = document.createElement("div");
  mainWrapper.classList.add("mainwrapper");
  // const outPutDiv = await createOutputDiv();
  // mainWrapper.appendChild(outPutDiv);
  const inputDiv = document.createElement("div");
  inputDiv.classList.add("inputdiv");
  const queryParamFormLink = `${formLink}`;
  const form = await createForm(queryParamFormLink);
  inputDiv.appendChild(form);
  mainWrapper.appendChild(inputDiv);
  // const outPutDiv = await createOutputDiv();
  // mainWrapper.appendChild(outPutDiv);


  block.replaceChildren(mainWrapper);
  let btn=document.querySelector("form button")

  btn.addEventListener('click', async function (e) {
    e.preventDefault();

    const valid = await handleSubmit(form);

    if (!valid) {
      const firstInvalidEl = form.querySelector(':invalid:not(fieldset)');
      if (firstInvalidEl) {
        firstInvalidEl.focus();
        firstInvalidEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}
