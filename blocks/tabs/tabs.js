function registerEvent() {
  const buttons = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".tab-content");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active classes
      buttons.forEach((btn) => btn.classList.remove("active"));
      contents.forEach((content) => content.classList.remove("active"));

      // Add active classes to selected tab and content
      button.classList.add("active");
      document.getElementById(button.dataset.tab).classList.add("active");
    });
  });
}

export default function decorate(block) {
  const tabwrapper = document.createElement("div");
  tabwrapper.classList.add("tabs");
  const tabButons = document.createElement("div");
  tabButons.classList.add("tab-buttons");

  const tabContents = document.createElement("div");
  tabContents.classList.add("tab-contents");
  Object.values(block.children).forEach((elem, i) => {
    const tabHead = elem.firstElementChild.textContent.trim();
    const tabDetails = elem.lastElementChild.textContent.trim();

    const tabButon = document.createElement("button");
    tabButon.classList.add("tab-button");
    tabButon.setAttribute("data-tab", `tab${i}`);
    tabButon.textContent = tabHead;
    tabButons.appendChild(tabButon);
    const tabContent = document.createElement("div");
    tabContent.classList.add("tab-content");
    tabContent.id = `tab${i}`;
    tabContent.textContent = tabDetails;
    tabContents.appendChild(tabContent);

    if (i == "0") {
      tabButon.classList.add("active");
      tabContent.classList.add("active");
    }
  });

  tabwrapper.append(tabButons);
  tabwrapper.append(tabContents);
  block.textContent = "";
  block.append(tabwrapper);

  registerEvent();
}
