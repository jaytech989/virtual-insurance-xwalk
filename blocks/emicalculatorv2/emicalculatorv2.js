import createField from "../form/form-fields.js";
let emiValue = {};
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

async function createFormMulti(formHref) {
  const resp = await fetch(formHref);
  const json = await resp.json();

  const form = document.createElement("div");
  // form.dataset.action = formHref.split(".json")[0];

  // Optional: Replace h1 with h4
  const h1element = document.getElementById("form-headline-1");
  if (h1element) {
    const h4element = document.createElement("h4");
    h4element.innerHTML = h1element.innerHTML;
    h1element.replaceWith(h4element);
    h4element.classList.add("form-headline-4");
  }

  // Group fields by Steppart
  const stepMap = {};
  json.data.forEach((item) => {
    const stepKey = `step${item.Steppart}`;
    if (!stepMap[stepKey]) {
      stepMap[stepKey] = [];
    }
    stepMap[stepKey].push(item);
  });

  const stepKeys = Object.keys(stepMap);
  const totalSteps = stepKeys.length;

  // Create step containers
  for (let i = 0; i < totalSteps; i++) {
    const stepKey = stepKeys[i];
    const stepWrapper = document.createElement("form");
    stepWrapper.classList.add("form-step");
    stepWrapper.id = stepKey;
    stepWrapper.dataset.stepIndex = i;
    if (i !== 0) stepWrapper.style.display = "none";

    // 👉 Stepper guide element
    const stepper = document.createElement("div");
    stepper.classList.add("stepper-guide");
    stepper.textContent = `Step ${i + 1} of ${totalSteps}`;
    stepWrapper.appendChild(stepper);

    // Create and append fields
    const fields = await Promise.all(
      stepMap[stepKey].map((fd) => createField(fd, form))
    );
    fields.forEach((field) => {
      if (field) stepWrapper.appendChild(field);
    });

    form.appendChild(stepWrapper);
  }
 
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

async function inputEventRegeister() {
  const inputFields = document.querySelectorAll(
    ".emicalculator input.calValinput , .emicalculatorv2 input.calValinput"
  );
  const rangeFields = document.querySelectorAll(
    ".emicalculator input[type='range'], .emicalculatorv2 input[type='range']"
  );

  const getOuterDivAndRange = (el) => {
    const outerDiv = el.closest(".outerdiv");
    const rangeInput = outerDiv.querySelector('input[type="range"]');
    return { outerDiv, rangeInput };
  };

  const updateEMI = async () => {
    const emi = await calculateEMI();
    document.getElementById("emiamount").textContent = emi;
  };

  rangeFields.forEach((el) => {
    el.addEventListener("input", async (event) => {
      event.preventDefault();
      const { outerDiv, rangeInput } = getOuterDivAndRange(event.currentTarget);
      outerDiv.querySelector(".calValinput").value = rangeInput.value;

      console.log(rangeInput.value);
      await updateEMI();
    });
  });

  // Handle text input focusout events
  inputFields.forEach((el) => {
    el.addEventListener("focusout", async (event) => {
      event.preventDefault();
      const { outerDiv, rangeInput } = getOuterDivAndRange(event.currentTarget);

      const currentVal = parseInt(event.currentTarget.value, 10);
      const minVal = parseInt(rangeInput.min, 10);
      const maxVal = parseInt(rangeInput.max, 10);

      let clampedVal = Math.max(minVal, Math.min(currentVal, maxVal));

      if (currentVal !== clampedVal) {
        outerDiv.querySelector(".calValinput").value = clampedVal;
      }

      // Update the range input to match the clamped value
      rangeInput.value = clampedVal;

      await updateEMI(); // Update EMI
    });
  });
}

// function enableStepNavigation(form) {
//   const steps = form.querySelectorAll(".form-step");
//   let currentStep = 0;

//   steps.forEach((step, index) => {
//     const submitBtn = step.querySelector('button[type="submit"], button.next-cta, button[name="nex-xta"]');

//     if (submitBtn) {
//       submitBtn.addEventListener("click", (e) => {
//         e.preventDefault();

//         if (index < steps.length - 1) {
//           // Hide current step
//           steps[index].style.display = "none";

//           // Show next step
//           steps[index + 1].style.display = "block";

//           currentStep = index + 1;
//         } else {
//           // Last step, you can call form.submit() or show a summary
//           form.submit();
//         }
//       });
//     }
//   });
// }
function enableStepNavigation(form) {
  const steps = form.querySelectorAll(".form-step");

  steps.forEach((step, index) => {
    const submitBtn = step.querySelector(
      'button[type="submit"], button.next-cta, button[name="nex-xta"]'
    );

    if (submitBtn) {
      submitBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const inputs = step.querySelectorAll("input, select, textarea");
        let allValid = true;

        inputs.forEach((input) => {
          
          const isRequired =
            input.hasAttribute("required") ||
            input.getAttribute("mandatory") === "true";

          // Reset any previous error
          input.classList.remove("field-error");

          if (isRequired) {
            const value =
              input.type === "checkbox" ? input.checked : input.value.trim();
            if (!value) {
              allValid = false;
              input.classList.add("field-error");
              if (
                !input.nextElementSibling ||
                !input.nextElementSibling.classList.contains("error-msg")
              ) {
                
                input.nextElementSibling.style.display = "block";
              }
            } else {
              const msg = input.nextElementSibling;
              if (
                msg &&
                msg.classList.contains("error-msg") &&
                msg.style.display == "block"
              ) {
                msg.style.display == "none";
              }
            }
          }
        });

        if (allValid) {
          if (index < steps.length - 1) {
            step.style.display = "none";
            steps[index + 1].style.display = "block";
          } else {
            form.submit(); // Last step
          }
        }
      });
    }
  });
}

export default async function decorate(block) {
  const formLink = block.querySelector("a[href]").getAttribute("href");
  const mainWrapper = document.createElement("div");
  mainWrapper.classList.add("mainwrapper");
  const inputDiv = document.createElement("div");
  inputDiv.classList.add("inputdiv");
  const queryParamFormLink = `${formLink}`;
  // const form = await createForm(queryParamFormLink);

  const form = await createFormMulti(queryParamFormLink);
  inputDiv.appendChild(form);
  mainWrapper.appendChild(inputDiv);
  const outPutDiv = await createOutputDiv();
  mainWrapper.appendChild(outPutDiv);
  block.replaceChildren(mainWrapper);

  // const emi = await calculateEMI();
  // const sds = (block.getElementsByClassName("emiamount")[0].textContent = emi);
  // inputEventRegeister();
  enableStepNavigation(form);
}
