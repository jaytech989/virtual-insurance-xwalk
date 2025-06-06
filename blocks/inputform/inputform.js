export default function decorate(block) {
  console.log("input form", block);
  /* change to ul, li */
  const blocklist = [...block.children]; // Get the children of block
  const classes = block.className; // Get block's class
  const divwrapper = document.createElement("div");
  const genderdiv=document.getElementsByClassName("gender-section-wrapper")[0];

  divwrapper.classList.add(...classes.split(" ")); // Add classes to the wrapper

  const labellist = block.children[0].textContent.trim().split(","); // First child = labels
  const inputValue = block.children[1].textContent.trim().split(","); // Second child = placeholders

  const form = document.createElement("form");

  // Create inputs and labels together
  labellist.forEach((labelText, index) => {
    const innerdiv = document.createElement("div");
    innerdiv.classList.add("innerform");
  
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
    innerdiv.appendChild(label);
    innerdiv.appendChild(input);
  
    // Append inner div to the form
    form.appendChild(innerdiv);
  });
  

  block.textContent = "";
  divwrapper.appendChild(form);
  block.appendChild(divwrapper);
  genderdiv.appendChild(block.parentElement);

}
