import { createOptimizedPicture } from "../../scripts/aem.js";
import { isAuthorEnvironment, moveInstrumentation } from "../../scripts/scripts.js";

function initFormHandler() {
  // Current step tracking
  let currentStep = 1;
  const totalSteps = 3;

  // Form data object to store selections
  let formData = {
    gender: "",
    age: "",
    mobile: "",
    amount: "",
    frequency: "",
    occupation: "",
    hazardous: "",
    bypassConsent: true,
    contactConsent: true,
  };

  // Update progress bar based on current step
  function updateProgressBar() {
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    document.querySelector(".progress-bar").style.width =
      progressPercentage + "%";
  }

  // Function to show a specific step
  function showStep(stepNumber) {
    // Hide all form steps
    document.querySelectorAll(".form-step").forEach((step) => {
      step.style.display = "none";
    });

    // Show the current step with fade-in effect
    const currentStepElement = document.getElementById("step" + stepNumber);
    currentStepElement.style.display = "block";
    currentStepElement.style.opacity = "0";

    // Simple fade in animation
    let opacity = 0;
    const fadeIn = setInterval(() => {
      if (opacity >= 1) {
        clearInterval(fadeIn);
      }
      currentStepElement.style.opacity = opacity.toString();
      opacity += 0.1;
    }, 30);

    // Update active step indicators
    document.querySelectorAll(".step").forEach((step, index) => {
      step.classList.remove("active");
      if (index + 1 < stepNumber) {
        step.classList.add("completed");
      } else if (index + 1 === stepNumber) {
        step.classList.add("active");
      }
    });

    // Update the progress bar
    updateProgressBar();

    // Show/hide back button on first step
    const backButtons = document.querySelectorAll(".back-button");
    backButtons.forEach((button) => {
      button.style.visibility = stepNumber === 1 ? "hidden" : "visible";
    });

    // Update current step
    currentStep = stepNumber;
  }

  // Set up event handlers for gender selection
  document
    .querySelectorAll(".gender-options .gender-option")
    .forEach((option) => {
      option.addEventListener("click", function () {
        // Remove selection from all options
        document
          .querySelectorAll(".gender-options .gender-option")
          .forEach((opt) => {
            opt.classList.remove("selected");
          });
        // Add selection to clicked option
        this.classList.add("selected");
        formData.gender = this.textContent.trim();
      });
    });

  // Set up event handlers for occupation selection
  document
    .querySelectorAll(".occupation-options .option-button")
    .forEach((option) => {
      option.addEventListener("click", function () {
        // Remove selection from all options
        document
          .querySelectorAll(".occupation-options .option-button")
          .forEach((opt) => {
            opt.classList.remove("selected");
          });
        // Add selection to clicked option
        this.classList.add("selected");
        formData.occupation = this.textContent.trim();
      });
    });

  // Set up event handlers for hazard selection
  document
    .querySelectorAll(".hazard-options .option-button")
    .forEach((option) => {
      option.addEventListener("click", function () {
        // Remove selection from all options
        document
          .querySelectorAll(".hazard-options .option-button")
          .forEach((opt) => {
            opt.classList.remove("selected");
          });
        // Add selection to clicked option
        this.classList.add("selected");
        formData.hazardous = this.getAttribute("data-hazard");
        window.location.href =
          "https://www.bandhanlife.com/online-plans/imaximize2";
      });
    });

  // Set up event handler for next button on step 1
  const step1Next = document.getElementById("step1Next");
  if (step1Next) {
    step1Next.addEventListener("click", function () {
      // Validate if gender is selected and fields are filled
      // if (!formData.gender) {
      //     alert('Please select your gender before proceeding.');
      //     return;
      // }

      // const ageInput = document.getElementById('age');
      // if (!ageInput.value) {
      //     alert('Please enter your age.');
      //     return;
      // }

      // const mobileInput = document.getElementById('mobile');
      // if (!mobileInput.value) {
      //     alert('Please enter your mobile number.');
      //     return;
      // }

      // Proceed to step 2
      this.parentElement.parentElement.parentElement.childNodes[3].childNodes[0].style.display =
        "block";
      showStep(2);
    });
  }

  // Set up event handlers for back buttons
  document.querySelectorAll(".back-button").forEach((button) => {
    button.addEventListener("click", function () {
      if (currentStep > 1) {
        showStep(currentStep - 1);
      }
    });
  });

  // Set up event handlers for input fields
  const ageInput = document.getElementById("age");
  if (ageInput) {
    ageInput.addEventListener("change", function () {
      formData.age = this.value;
    });
  }

  const mobileInput = document.getElementById("mobile");
  if (mobileInput) {
    mobileInput.addEventListener("change", function () {
      formData.mobile = this.value;
    });
  }

  const amountInput = document.getElementById("amount");
  if (amountInput) {
    amountInput.addEventListener("change", function () {
      formData.amount = this.value;
    });
  }

  const frequencyInput = document.getElementById("frequency");
  if (frequencyInput) {
    frequencyInput.addEventListener("change", function () {
      formData.frequency = this.value;
    });
  }

  // Set up event handlers for consent checkboxes
  const bypassConsent = document.getElementById("bypass-consent");
  if (bypassConsent) {
    bypassConsent.addEventListener("change", function () {
      formData.bypassConsent = this.checked;
    });
  }

  const contactConsent = document.getElementById("contact-consent");
  if (contactConsent) {
    contactConsent.addEventListener("change", function () {
      formData.contactConsent = this.checked;
    });
  }

  // Set up submit button event handler
  document.querySelectorAll(".submit-button").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const bypassConsent = document.getElementById("bypass-consent");
      const contactConsent = document.getElementById("contact-consent");

      // // Check if both consents are checked
      // if (!bypassConsent.checked || !contactConsent.checked) {
      //     alert('Please accept all the consent options to proceed.');
      //     return;
      // }

      // Form submission logic
      console.log("Form submitted with data:", formData);

      setTimeout(() => {
        showStep(3);
      }, 300);

      // Here you would typically make an AJAX call to submit the data
    });
  });

  // Initialize the form
  showStep(1);
}

async function fetchData(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    console.log(response, "response");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response JSON:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}


export default function decorate(block) {
  debugger
  let path="";
    let headingCf=""
    let newImg="";
  const blockImg = block.children[10]
  if(blockImg){
    const img=blockImg.querySelector("picture > img");
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
      { width: "750" },
    ]);
    moveInstrumentation(img, optimizedPic.querySelector("img"));
    img.closest("picture").replaceWith(optimizedPic);
    newImg = optimizedPic
      .querySelector("picture > img")
      .getAttribute("src");
  }



  const mainHead = block.children[0].textContent.trim();
  // const head1 = block.children[1].textContent.trim();
  const head2 = block.children[1].textContent.trim();
  const genderOpt = block.children[2].textContent.trim().split(",");

  const labellist = block.children[3].textContent.trim().split(","); // First child = labels
  const inputValue = block.children[4].textContent.trim().split(","); // Second child = placeholders

  // const formLabel=block.children[4].textContent.trim();
  // const fromValue=block.children[5].textContent.trim();

  const disc = block.children[5].textContent.trim().split(",");
  const ctaText = block.children[6].textContent.trim();
  const tellMeOcc = block.children[7].textContent.trim();
  const occopt = block.children[8].textContent.trim().split(",");
  const blockLink = block.children[9];
  if(blockLink){

    const link=blockLink.querySelector("a");
      path = link ? link.getAttribute("href") : block.textContent.trim();

  }
  // //   const link = cfPath.

  //   console.log("img",block.children[10].children[0].childNodes[0].firstChild.attributes[0].nodeValue);

  const container = document.createElement("div");
  container.setAttribute("class", "container");

  const divEl = document.createElement("div");
  divEl.setAttribute("class", "cmp-form-banner-container");

  const divEl2 = document.createElement("div");
  divEl2.setAttribute("class", "investment-form-container");

  const divEl3 = document.createElement("div");
  divEl3.setAttribute("class", "form-header");

  const divEl4 = document.createElement("div");
  divEl4.setAttribute("class", "disclaimer");
  divEl4.setAttribute("id", "disclaimer");
  divEl4.textContent = headingCf;
  divEl3.append(divEl4);

  const h1El = document.createElement("h1");
  // h1El.setAttribute("id", "cf-heading");

  h1El.append(mainHead);
  const spanEl = document.createElement("span");
  spanEl.setAttribute("class", "new-tag");
  spanEl.textContent = "New";
  h1El.append(spanEl);
  divEl3.append(h1El);

  const h2El = document.createElement("h2");
  h2El.textContent = head2;
  divEl3.append(h2El);
  divEl2.append(divEl3);

  const divEl5 = document.createElement("div");
  divEl5.setAttribute("class", "multi-step-form");

  const divEl6 = document.createElement("div");
  divEl6.setAttribute("class", "step-indicators");

  const divEl7 = document.createElement("div");
  divEl7.setAttribute("class", "progress-bar");
  divEl6.append(divEl7);

  const divEl8 = document.createElement("div");
  divEl8.setAttribute("class", "step active");
  divEl8.setAttribute("data-step", "1");
  divEl6.append(divEl8);

  const divEl9 = document.createElement("div");
  divEl9.setAttribute("class", "step");
  divEl9.setAttribute("data-step", "2");
  divEl6.append(divEl9);

  const divEl10 = document.createElement("div");
  divEl10.setAttribute("class", "step");
  divEl10.setAttribute("data-step", "3");
  divEl6.append(divEl10);
  divEl5.append(divEl6);

  const divEl11 = document.createElement("div");
  divEl11.setAttribute("class", "form-step");
  divEl11.setAttribute("id", "step1");

  const divEl12 = document.createElement("div");
  divEl12.setAttribute("class", "step-header");

  const buttonEl = document.createElement("button");
  buttonEl.setAttribute("class", "back-button");
  buttonEl.setAttribute("style", "visibility: hidden;");

  const spanEl2 = document.createElement("span");
  spanEl2.setAttribute("class", "arrow-icon");
  spanEl2.textContent = "←";
  buttonEl.append(spanEl2);
  divEl12.append(buttonEl);

  // const h3El = document.createElement('h3');
  // h3El.textContent = 'Enter your personal details';
  // divEl12.append(h3El);
  // divEl11.append(divEl12);

  const h3El2 = document.createElement("h3");
  h3El2.textContent = "Gender";
  divEl11.append(h3El2);

  //gender div
  const divEl13 = document.createElement("div");
  divEl13.setAttribute("class", "gender-options");

  block.children[2].textContent
    .trim()
    .split(",")
    .forEach((labelText, index) => {
      const btn = document.createElement("button");

      btn.classList.add("gender-option");

      // const label = document.createElement("label");
      // const input = document.c
      // reateElement("input");
      // buttonEl2.textContent = 'Male';

      // // Setup input
      // input.type = "text";
      // input.placeholder = inputValue[index] || "";
      // input.name = `input${index}`;
      // input.id = `input${index}`;

      // // Setup label
      // label.htmlFor = input.id;
      btn.textContent = labelText.trim();

      // Append label and input into the inner div

      // Append inner div to the form
      divEl13.appendChild(btn);
    });
  console.log("divEl13", divEl13);
  divEl11.append(divEl13);

  //   const buttonEl2 = document.createElement('button');
  //   buttonEl2.setAttribute('class', 'gender-option selected');
  //   buttonEl2.textContent = 'Male';
  //   divEl13.append(buttonEl2);

  //   const buttonEl3 = document.createElement('button');
  //   buttonEl3.setAttribute('class', 'gender-option');
  //   buttonEl3.textContent = 'Female';
  //   divEl13.append(buttonEl3);

  //   const buttonEl4 = document.createElement('button');
  //   buttonEl4.setAttribute('class', 'gender-option ');
  //   buttonEl4.textContent = 'Others';

  //   divEl13.append(buttonEl4);
  //   divEl11.append(divEl13);

  const divEl14 = document.createElement("div");
  divEl14.setAttribute("class", "form-row");

  const divEl15 = document.createElement("div");
  divEl15.setAttribute("class", "form-group");

  labellist.forEach((labelText, index) => {
    const divEl15 = document.createElement("div");
    divEl15.setAttribute("class", "form-group");
    // const innerdiv = document.createElement("div");
    // innerdiv.classList.add("innerform");

    const label = document.createElement("label");
    const input = document.createElement("input");

    // Setup input
    input.type = "text";
    input.placeholder = inputValue[index] || "";
    input.name = `input${index}`;
    input.id = `input${index}`;

    // Setup label
    label.htmlFor = input.id;
    label.textContent = labelText.trim();

    // Append label and input into the inner div
    divEl15.appendChild(label);
    divEl15.appendChild(input);
    divEl14.append(divEl15);

    // Append inner div to the form
  });
  //   divEl14.append(divEl15);

  divEl11.append(divEl14);

  //   const labelEl = document.createElement('label');
  //   labelEl.setAttribute('for', 'age');
  //   labelEl.textContent = 'Age (As per PAN)';
  //   divEl15.append(labelEl);

  //   const inputEl = document.createElement('input');
  //   inputEl.setAttribute('type', 'text');
  //   inputEl.setAttribute('id', 'age');
  //   inputEl.setAttribute('placeholder', '21Yrs (04-03-2004)');
  //   inputEl.setAttribute('value', '21Yrs (04-03-2004)');
  //   divEl15.append(inputEl);
  //   divEl14.append(divEl15);

  //   const divEl16 = document.createElement('div');
  //   divEl16.setAttribute('class', 'form-group');

  //   const labelEl2 = document.createElement('label');
  //   labelEl2.setAttribute('for', 'mobile');
  //   labelEl2.textContent = 'Mobile Number (We Don\'t Spam)';
  //   divEl16.append(labelEl2);

  //   const divEl17 = document.createElement('div');
  //   divEl17.setAttribute('class', 'mobile-input');

  //   const spanEl3 = document.createElement('span');
  //   spanEl3.setAttribute('class', 'country-code');
  //   spanEl3.textContent = '+91';
  //   divEl17.append(spanEl3);

  //   const inputEl2 = document.createElement('input');
  //   inputEl2.setAttribute('type', 'tel');
  //   inputEl2.setAttribute('id', 'mobile');
  //   inputEl2.setAttribute('placeholder', '7788556699');
  //   inputEl2.setAttribute('value', '7788556699');
  //   divEl17.append(inputEl2);
  //   divEl16.append(divEl17);
  //   divEl14.append(divEl16);
  //   divEl11.append(divEl14);

  //   const divEl18 = document.createElement('div');
  //   divEl18.setAttribute('class', 'form-row');

  //   const divEl19 = document.createElement('div');
  //   divEl19.setAttribute('class', 'form-group');

  //   const labelEl3 = document.createElement('label');
  //   labelEl3.setAttribute('for', 'amount');
  //   labelEl3.textContent = 'Amount';
  //   divEl19.append(labelEl3);

  //   const inputEl3 = document.createElement('input');
  //   inputEl3.setAttribute('type', 'text');
  //   inputEl3.setAttribute('id', 'amount');
  //   inputEl3.setAttribute('value', '₹9,87,656');
  //   divEl19.append(inputEl3);
  //   divEl18.append(divEl19);

  //   const divEl20 = document.createElement('div');
  //   divEl20.setAttribute('class', 'form-group');

  //   const labelEl4 = document.createElement('label');
  //   labelEl4.setAttribute('for', 'frequency');
  //   labelEl4.textContent = 'Frequency';
  //   divEl20.append(labelEl4);

  //   const divEl21 = document.createElement('div');
  //   divEl21.setAttribute('class', 'select-wrapper');

  //   const selectEl = document.createElement('select');
  //   selectEl.setAttribute('id', 'frequency');

  //   const optionEl = document.createElement('option');
  //   optionEl.setAttribute('value', 'yearly');
  //   optionEl.textContent = 'Yearly';
  //   selectEl.append(optionEl);

  //   const optionEl2 = document.createElement('option');
  //   optionEl2.setAttribute('value', 'half-yearly');
  //   optionEl2.textContent = 'Half-Yearly';
  //   selectEl.append(optionEl2);

  //   const optionEl3 = document.createElement('option');
  //   optionEl3.setAttribute('value', 'quarterly');
  //   optionEl3.textContent = 'Quarterly';
  //   selectEl.append(optionEl3);

  //   const optionEl4 = document.createElement('option');
  //   optionEl4.setAttribute('value', 'monthly');
  //   optionEl4.textContent = 'Monthly';
  //   selectEl.append(optionEl4);
  //   divEl21.append(selectEl);

  //   const divEl22 = document.createElement('div');
  //   divEl22.setAttribute('class', 'select-arrow');
  //   divEl22.textContent = '▼';
  //   divEl21.append(divEl22);
  //   divEl20.append(divEl21);
  //   divEl18.append(divEl20);
  //   divEl11.append(divEl18);

  const divEl23 = document.createElement("div");
  divEl23.setAttribute("class", "consent-section");

  const divEl24 = document.createElement("div");
  divEl24.setAttribute("class", "checkbox-group");

  //   const inputEl4 = document.createElement('input');
  //   inputEl4.setAttribute('type', 'checkbox');
  //   inputEl4.setAttribute('id', 'bypass-consent');
  //   inputEl4.setAttribute('checked', '');
  //   divEl24.append(inputEl4);

  //   const labelEl5 = document.createElement('label');
  //   labelEl5.setAttribute('for', 'bypass-consent');

  //   const aEl = document.createElement('a');
  //   aEl.setAttribute('href', '#');
  //   aEl.setAttribute('class', 'link');
  //   aEl.textContent = 'suitability analysis';
  //   labelEl5.append(aEl);
  //   divEl24.append(labelEl5);
  //   divEl23.append(divEl24);
  const divEl25 = document.createElement("div");


  disc.forEach(function (disctxt) {
      const innerDiv = document.createElement("div");

    innerDiv.setAttribute("class", "checkbox-group");

    const inputEl5 = document.createElement("input");
    inputEl5.setAttribute("type", "checkbox");
    inputEl5.setAttribute("id", "contact-consent");
    inputEl5.setAttribute("checked", "");
    innerDiv.append(inputEl5);

    const labelEl6 = document.createElement("label");
    labelEl6.setAttribute("for", "contact-consent");
    labelEl6.textContent = disctxt;
    innerDiv.append(labelEl6);
    divEl25.append(innerDiv);

    
  });

  divEl23.append(divEl25);
  divEl11.append(divEl23);

  const divEl26 = document.createElement("div");
  divEl26.setAttribute("class", "button-container");

  const buttonEl5 = document.createElement("button");
  buttonEl5.setAttribute("class", "next-button");
  buttonEl5.setAttribute("id", "step1Next");
  buttonEl5.textContent = ctaText;
  divEl26.append(buttonEl5);
  divEl11.append(divEl26);
  divEl5.append(divEl11);

  const divEl27 = document.createElement("div");
  divEl27.setAttribute("class", "form-step");
  divEl27.setAttribute("id", "step3");
  divEl27.setAttribute("style", "display: none;");

  const divEl28 = document.createElement("div");
  divEl28.setAttribute("class", "step-header");
  divEl27.setAttribute("style", "display: block;");

  const buttonEl6 = document.createElement("button");
  buttonEl6.setAttribute("class", "back-button");

  const spanEl4 = document.createElement("span");
  spanEl4.setAttribute("class", "arrow-icon");
  spanEl4.textContent = "←";
  buttonEl6.append(spanEl4);
  divEl28.append(buttonEl6);

  const h3El3 = document.createElement("h3");
  h3El3.textContent = tellMeOcc;
  divEl28.append(h3El3);
  divEl27.append(divEl28);

  const divEl29 = document.createElement("div");
  divEl29.setAttribute("class", "hazard-question");

  const h4El = document.createElement("h4");
  h4El.textContent =
    "Is your occupation associated with any specific hazard or do you take part in activities that could be dangerous in any way?";
  divEl29.append(h4El);

  const pEl = document.createElement("p");
  pEl.setAttribute("class", "examples");
  pEl.textContent =
    "(e.g. Heavy machines, chemical factory, mines explosives, radiation, etc.)";
  divEl29.append(pEl);

  const divEl30 = document.createElement("div");
  divEl30.setAttribute("class", "hazard-options");

  const buttonEl7 = document.createElement("button");
  buttonEl7.setAttribute("class", "option-button");
  buttonEl7.setAttribute("data-hazard", "yes");
  buttonEl7.textContent = "Yes";
  divEl30.append(buttonEl7);

  const buttonEl8 = document.createElement("button");
  buttonEl8.setAttribute("class", "option-button");
  buttonEl8.setAttribute("data-hazard", "no");
  buttonEl8.textContent = "No";
  divEl30.append(buttonEl8);
  divEl29.append(divEl30);
  divEl27.append(divEl29);
  divEl5.append(divEl27);

  const divEl31 = document.createElement("div");
  divEl31.setAttribute("class", "form-step");
  divEl31.setAttribute("id", "step2");
  divEl31.setAttribute("style", "display: none;");

  const divEl32 = document.createElement("div");
  divEl32.setAttribute("class", "step-header");
  divEl31.setAttribute("style", "display: block;");

  const buttonEl9 = document.createElement("button");
  buttonEl9.setAttribute("class", "back-button");

  const spanEl5 = document.createElement("span");
  spanEl5.setAttribute("class", "arrow-icon");
  spanEl5.textContent = "←";
  buttonEl9.append(spanEl5);
  divEl32.append(buttonEl9);

  const h3El4 = document.createElement("h3");
  h3El4.textContent = tellMeOcc;
  divEl32.append(h3El4);
  divEl31.append(divEl32);

  const divEl33 = document.createElement("div");
  divEl33.setAttribute("class", "occupation-options");

  const divEl34 = document.createElement("div");
  divEl34.setAttribute("class", "option-row opt-row");

  occopt.forEach(function (occopt, index) {
    const buttonEl10 = document.createElement("button");
    buttonEl10.setAttribute("class", "option-button opt-btn");
    buttonEl10.textContent = occopt;
    divEl34.append(buttonEl10);
  });

  // divEl36.append(buttonEl17);
  divEl33.append(divEl34);
  divEl31.append(divEl33);

  // const buttonEl10 = document.createElement('button');
  // buttonEl10.setAttribute('class', 'option-button');
  // buttonEl10.textContent = 'Salaried';
  // divEl34.append(buttonEl10);

  // const buttonEl11 = document.createElement('button');
  // buttonEl11.setAttribute('class', 'option-button');
  // buttonEl11.textContent = 'Armed forces / Police';
  // divEl34.append(buttonEl11);

  // const buttonEl12 = document.createElement('button');
  // buttonEl12.setAttribute('class', 'option-button');
  // buttonEl12.textContent = 'Agriculturist';
  // divEl34.append(buttonEl12);
  // divEl33.append(divEl34);

  // const divEl35 = document.createElement('div');
  // divEl35.setAttribute('class', 'option-row');

  // const buttonEl13 = document.createElement('button');
  // buttonEl13.setAttribute('class', 'option-button');
  // buttonEl13.textContent = 'Student';
  // divEl35.append(buttonEl13);

  // const buttonEl14 = document.createElement('button');
  // buttonEl14.setAttribute('class', 'option-button selected');
  // buttonEl14.textContent = 'Worker/labour';
  // divEl35.append(buttonEl14);

  // const buttonEl15 = document.createElement('button');
  // buttonEl15.setAttribute('class', 'option-button');
  // buttonEl15.textContent = 'Retired /Pensioners';
  // divEl35.append(buttonEl15);
  // divEl33.append(divEl35);

  // const divEl36 = document.createElement('div');
  // divEl36.setAttribute('class', 'option-row');

  // const buttonEl16 = document.createElement('button');
  // buttonEl16.setAttribute('class', 'option-button');
  // buttonEl16.textContent = 'Self-employed (Professional)';
  // divEl36.append(buttonEl16);

  // const buttonEl17 = document.createElement('button');
  // buttonEl17.setAttribute('class', 'option-button');
  // buttonEl17.textContent = 'Self-employed (Business)';
  // divEl36.append(buttonEl17);
  // divEl33.append(divEl36);
  // divEl31.append(divEl33);

  const divEl37 = document.createElement("div");
  divEl37.setAttribute("class", "button-container");

  const buttonEl18 = document.createElement("button");
  buttonEl18.setAttribute("class", "submit-button");
  buttonEl18.textContent = "See My Returns";
  divEl37.append(buttonEl18);
  divEl31.append(divEl37);
  divEl5.append(divEl31);
  divEl2.append(divEl5);
  divEl.append(divEl2);

  const divEl38 = document.createElement("div");
  divEl38.setAttribute("class", "cmp-form-banner-image");

  const pictureEl = document.createElement("picture");
  pictureEl.setAttribute("class", "banner-image style2");

  const sourceEl = document.createElement("source");
  sourceEl.setAttribute("media", "(max-width:768px)");
  sourceEl.setAttribute("srcset", newImg);
  pictureEl.append(sourceEl);

  const sourceEl2 = document.createElement("source");
  sourceEl2.setAttribute("media", "(min-width:768px)");
  sourceEl2.setAttribute("srcset", newImg);
  pictureEl.append(sourceEl2);

  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", newImg);
  imgEl.setAttribute("alt", "img");
  imgEl.setAttribute("height", "650");
  imgEl.setAttribute("width", "1069");
  imgEl.setAttribute("loading", "lazy");
  pictureEl.append(imgEl);
  divEl38.append(pictureEl);
  divEl.append(divEl38);
  container.append(divEl);

  block.textContent = "";
  block.append(container);

  initFormHandler();

  (async () => {
    debugger
    try {
      let domainUrl=""
      // const envCheck=isAuthorEnvironment();
      if(isAuthorEnvironment()){

        domainUrl= "https://author-p102857-e1312424.adobeaemcloud.com/graphql/execute.json/bandhan-ue-demo/bannerquery;path="+path+";variation=master"

      }else{
        domainUrl= "https://publish-p102857-e1312424.adobeaemcloud.com/graphql/execute.json/bandhan-ue-demo/bannerquery;path="+path+";variation=master"

      }

      const resp = await fetchData(domainUrl);
      console.log("Final Response:", resp.data.bannerTextByPath.item.bannerText);
       headingCf = resp.data.bannerTextByPath.item.bannerText;
       document.getElementById("disclaimer").append(headingCf);
    } catch (err) {
      console.error("Error during fetchData call:", err);
    }
  })();
}
