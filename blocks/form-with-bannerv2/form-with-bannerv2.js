import { createOptimizedPicture } from "../../scripts/aem.js";
import {
  isAuthorEnvironment,
  moveInstrumentation,
} from "../../scripts/scripts.js";
import createField from "../form/form-fields.js";

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
      // credentials: "include",
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
              if (msg && msg.style.display == "block") {
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

async function callCFApi(path) {
  try {
    let domainUrl = "";
    // const envCheck=isAuthorEnvironment();
    if (isAuthorEnvironment()) {
      domainUrl =
        "https://author-p102857-e1312424.adobeaemcloud.com/graphql/execute.json/bandhan-ue-demo/bannerquery;path=" +
        path +
        ";variation=master";
    } else {
      domainUrl =
        "https://publish-p102857-e1312424.adobeaemcloud.com/graphql/execute.json/bandhan-ue-demo/bannerquery;path=" +
        path +
        ";variation=master";
    }

    const resp = await fetchData(domainUrl);
    console.log("Final Response:", resp.data.bannerTextByPath.item.bannerText);
    const headingCf = resp.data.bannerTextByPath.item.bannerText;
    //  document.getElementById("disclaimer").append(headingCf);
    return headingCf;
  } catch (err) {
    console.error("Error during fetchData call:", err);
  }
}
export default async function decorate(block) {
  
  const heading = block.children[0];
  const subHeading = block.children[1];
  const img = block.children[3];
  const contenntSection = document.createElement("div");
  contenntSection.classList.add("investment-form-container");
  const imageSectionn = document.createElement("div");
  imageSectionn.classList.add("cmp-img");

  const formLink = block.children[4]
    .querySelector("a[href]")
    .getAttribute("href");
  const cfPath = block.children[2]
    .querySelector("a[href]")
    .getAttribute("href");
  const disclaimer = await callCFApi(cfPath);
  // block.children[2].textContent = disclaimer ? disclaimer : "";
  console.log(disclaimer);

  const mainWrapper = document.createElement("div");
  mainWrapper.classList.add("mainwrapper");
  const inputDiv = document.createElement("div");
  inputDiv.classList.add("inputdiv");
  const queryParamFormLink = `${formLink}`;
  const form = await createFormMulti(queryParamFormLink);
  inputDiv.appendChild(form);
  mainWrapper.appendChild(inputDiv);
  block.children[4].remove();
  // const outPutDiv = await createOutputDiv();
  // mainWrapper.appendChild(outPutDiv);

  //   block.forEach((block)=>{
  // block.querySelector("picture")

  //   })
  
  contenntSection.appendChild(heading);
  contenntSection.appendChild(subHeading);

  contenntSection.append(disclaimer);
  contenntSection.append(mainWrapper);
  imageSectionn.append(img);

  const outerWrapperMain = document.createElement("div");
  outerWrapperMain.classList.add("main-container");
  outerWrapperMain.appendChild(contenntSection);
  outerWrapperMain.appendChild(imageSectionn);

  block.replaceWith(outerWrapperMain);
  // block.append(imageSectionn);

  enableStepNavigation(form);
}
