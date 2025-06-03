// import { createOptimizedPicture } from "../../scripts/aem";
// import { moveInstrumentation } from "../../scripts/scripts";
import { createOptimizedPicture } from "../../scripts/aem.js";
import {
  moveInstrumentation,
} from "../../scripts/scripts.js";

export default function decorate(block) {
  let popAllImg = "";
  const popImg = block.children[1];
console.log("popImg",popImg)
  // const popImg = block.children[10]
  if (popImg && popImg.querySelector("picture > img")!==null) {
    const img = popImg.querySelector("picture > img");
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
      { width: "750" },
    ]);
    moveInstrumentation(img, optimizedPic.querySelector("img"));
    img.closest("picture").replaceWith(optimizedPic);
    popAllImg = optimizedPic.querySelector("picture > img").getAttribute("src");
  }
  // if (popImg && popImg.querySelector("picture > img").src) {
  //   const qimg = popImg.querySelector("picture > img");
  //   const optimizedPic = createOptimizedPicture(qimg.src, qimg.alt, false, [
  //     { width: "750" },
  //   ]);
  //   moveInstrumentation(qimg, optimizedPic.querySelector("img"));
  //   qimg.closest("picture").replaceWith(optimizedPic);
  //   popAllImg = optimizedPic.querySelector("picture > img").getAttribute("src");
  // }
  let quickAllImg = "";
  const quickImg = block.children[6];
  if (quickImg && quickImg.querySelector("picture > img")!==null) {
    const pimg = quickImg.querySelector("picture > img");
    const qoptimizedPic = createOptimizedPicture(pimg.src, pimg.alt, false, [
      { width: "750" },
    ]);
    moveInstrumentation(pimg, qoptimizedPic.querySelector("img"));
    pimg.closest("picture").replaceWith(qoptimizedPic);
    quickAllImg = qoptimizedPic
      .querySelector("picture > img")
      .getAttribute("src");
  }
  const mostPopHead = block.children[0].textContent.trim();
  const mostPopSubDesc = block.children[2].textContent.trim().split(",");
  const mostPopSubDesc2 = block.children[3].textContent.trim().split(",");
  const quickHead = block.children[4].textContent.trim().split(",");
  const qucikPopSubhEad = block.children[5].textContent.trim().split(",");

  const combined = mostPopSubDesc.map((item, index) => [
    item,
    mostPopSubDesc2[index],
  ]);
  // const combinedQuick = mostPopSubDesc.map((item, index) => [
  //   item,
  //   mostPopSubDesc2[index],
  // ]);
  console.log(combined);
  const container = document.createElement("div");
  container.setAttribute("class", "container");

  const divEl = document.createElement("div");
  divEl.setAttribute("class", "section most-pop columns-container");
  divEl.setAttribute("style", "");

  const divEl2 = document.createElement("div");
  divEl2.setAttribute("class", "columns-wrapper");

  const divEl3 = document.createElement("div");
  divEl3.setAttribute("class", "columns block columns-2-cols");

  const divEl4 = document.createElement("div");

  const divEl5 = document.createElement("div");

  const divEl6 = document.createElement("div");
  divEl6.setAttribute("data-aue-prop", "text");

  const pEl = document.createElement("p");
  pEl.textContent = mostPopHead;
  divEl6.append(pEl);
  divEl5.append(divEl6);

  const divEl7 = document.createElement("div");
  divEl7.setAttribute("class", "cards-with-paragraph");

  combined.forEach((ele, ind) => {
    console.log(ele, "ele");

    const divEl8 = document.createElement("div");

    const divEl9 = document.createElement("div");
    divEl9.setAttribute("class", "columns-img-col");

    const pictureEl = document.createElement("picture");

    const imgEl = document.createElement("img");
    imgEl.setAttribute(
      "src",
      popAllImg
    );
    imgEl.setAttribute("data-aue-prop", "image");
    pictureEl.append(imgEl);
    divEl9.append(pictureEl);
    divEl8.append(divEl9);

    const divEl10 = document.createElement("div");

    const divEl11 = document.createElement("div");
    divEl11.setAttribute("data-aue-prop", "rte");

    const pEl2 = document.createElement("p");
    pEl2.textContent = ele[0];
    divEl11.append(pEl2);

    // const pEl3 = document.createElement("p");
    // pEl3.textContent = "ULIP";
    // divEl11.append(pEl3);
    divEl10.append(divEl11);
    divEl8.append(divEl10);

    const divEl12 = document.createElement("div");
    divEl12.setAttribute("data-aue-prop", "Simple Texts");
    divEl12.textContent = ele[1];
    divEl8.append(divEl12);

    const divEl13 = document.createElement("div");
    divEl8.append(divEl13);
    divEl7.append(divEl8);
  });

  // const divEl14 = document.createElement("div");

  // const divEl15 = document.createElement("div");

  // const pictureEl2 = document.createElement("picture");

  // const imgEl2 = document.createElement("img");
  // imgEl2.setAttribute(
  //   "src",
  //   "https://www.bandhanlife.com/staticassets/2024-11/iInvest-Advantage-icon.svg"
  // );
  // imgEl2.setAttribute("data-aue-prop", "image");
  // pictureEl2.append(imgEl2);
  // divEl15.append(pictureEl2);
  // divEl14.append(divEl15);

  // const divEl16 = document.createElement("div");

  // const divEl17 = document.createElement("div");
  // divEl17.setAttribute("data-aue-prop", "rte");

  // const pEl4 = document.createElement("p");
  // pEl4.textContent = "iInvest Advantage";
  // divEl17.append(pEl4);

  // const pEl5 = document.createElement("p");
  // pEl5.textContent = "ULIP";
  // divEl17.append(pEl5);
  // divEl16.append(divEl17);
  // divEl14.append(divEl16);

  // const divEl18 = document.createElement("div");
  // divEl18.setAttribute("data-aue-prop", "Simple Texts");
  // divEl18.textContent = "Super Flexible. High Performance.";
  // divEl14.append(divEl18);

  // const divEl19 = document.createElement("div");
  // divEl14.append(divEl19);
  // divEl7.append(divEl14);

  // const divEl20 = document.createElement("div");

  // const divEl21 = document.createElement("div");

  // const pictureEl3 = document.createElement("picture");

  // const imgEl3 = document.createElement("img");
  // imgEl3.setAttribute(
  //   "src",
  //   "https://www.bandhanlife.com/staticassets/2024-11/iInvest-Advantage-icon.svg"
  // );
  // imgEl3.setAttribute("data-aue-prop", "image");
  // pictureEl3.append(imgEl3);
  // divEl21.append(pictureEl3);
  // divEl20.append(divEl21);

  // const divEl22 = document.createElement("div");

  // const divEl23 = document.createElement("div");
  // divEl23.setAttribute("data-aue-prop", "rte");

  // const pEl6 = document.createElement("p");
  // pEl6.textContent = "iInvest Advantage";
  // divEl23.append(pEl6);

  // const pEl7 = document.createElement("p");
  // pEl7.textContent = "ULIP";
  // divEl23.append(pEl7);
  // divEl22.append(divEl23);
  // divEl20.append(divEl22);

  // const divEl24 = document.createElement("div");
  // divEl24.setAttribute("data-aue-prop", "Simple Texts");
  // divEl24.textContent = "Super Flexible. High Performance.";
  // divEl20.append(divEl24);

  // const divEl25 = document.createElement("div");
  // divEl20.append(divEl25);
  // divEl7.append(divEl8);
  divEl5.append(divEl7);
  divEl4.append(divEl5);

  const divEl26 = document.createElement("div");

  const divEl27 = document.createElement("div");
  divEl27.setAttribute("data-aue-prop", "text");

  const pEl8 = document.createElement("p");
  pEl8.textContent = quickHead;
  divEl27.append(pEl8);
  divEl26.append(divEl27);

  const divEl28 = document.createElement("div");
  divEl28.setAttribute("class", "cards");

  qucikPopSubhEad.forEach((ele, ind) => {
    const divEl29 = document.createElement("div");

    const divEl30 = document.createElement("div");
    divEl30.setAttribute("class", "columns-img-col");

    const pictureEl4 = document.createElement("picture");

    const imgEl4 = document.createElement("img");
    imgEl4.setAttribute("src", quickAllImg);
    imgEl4.setAttribute("data-aue-prop", "image");
    pictureEl4.append(imgEl4);
    divEl30.append(pictureEl4);
    divEl29.append(divEl30);

    const divEl31 = document.createElement("div");
    divEl31.setAttribute("data-richtext-prop", "text");
    divEl31.setAttribute("data-richtext-label", "Text");
    divEl31.setAttribute("data-richtext-filter", "text");
    divEl31.textContent = ele;
    divEl29.append(divEl31);

    const divEl32 = document.createElement("div");
    divEl29.append(divEl32);
    divEl28.append(divEl29);

    // const divEl33 = document.createElement("div");

    // const divEl34 = document.createElement("div");

    // const pictureEl5 = document.createElement("picture");

    // const imgEl5 = document.createElement("img");
    // imgEl5.setAttribute("src", popAllImg);
    // imgEl5.setAttribute("data-aue-prop", "image");
    // pictureEl5.append(imgEl5);
    // divEl34.append(pictureEl5);
    // divEl33.append(divEl34);

    // const divEl35 = document.createElement("div");
    // divEl35.setAttribute("data-richtext-prop", "text");
    // divEl35.setAttribute("data-richtext-label", "Text");
    // divEl35.setAttribute("data-richtext-filter", "text");
    // divEl35.textContent = "Pay Premium";
    // divEl33.append(divEl35);
  });

  // const divEl36 = document.createElement("div");
  // divEl33.append(divEl36);
  // divEl28.append(divEl33);

  // const divEl37 = document.createElement("div");

  // const divEl38 = document.createElement("div");

  // const pictureEl6 = document.createElement("picture");

  // const imgEl6 = document.createElement("img");
  // imgEl6.setAttribute(
  //   "src",
  //   "https://www.bandhanlife.com/staticassets/2023-11/PayPremium.svg"
  // );
  // imgEl6.setAttribute("data-aue-prop", "image");
  // pictureEl6.append(imgEl6);
  // divEl38.append(pictureEl6);
  // divEl37.append(divEl38);

  // const divEl39 = document.createElement("div");
  // divEl39.setAttribute("data-richtext-prop", "text");
  // divEl39.setAttribute("data-richtext-label", "Text");
  // divEl39.setAttribute("data-richtext-filter", "text");
  // divEl39.textContent = "Pay Premium";
  // divEl37.append(divEl39);

  // const divEl40 = document.createElement("div");
  // divEl37.append(divEl40);
  // divEl28.append(divEl37);

  // const divEl41 = document.createElement("div");

  // const divEl42 = document.createElement("div");

  // const pictureEl7 = document.createElement("picture");

  // const imgEl7 = document.createElement("img");
  // imgEl7.setAttribute(
  //   "src",
  //   "https://www.bandhanlife.com/staticassets/2023-11/PayPremium.svg"
  // );
  // imgEl7.setAttribute("data-aue-prop", "image");
  // pictureEl7.append(imgEl7);
  // divEl42.append(pictureEl7);
  // divEl41.append(divEl42);

  // const divEl43 = document.createElement("div");
  // divEl43.setAttribute("data-richtext-prop", "text");
  // divEl43.setAttribute("data-richtext-label", "Text");
  // divEl43.setAttribute("data-richtext-filter", "text");
  // divEl43.textContent = "Pay Premium";
  // divEl41.append(divEl43);

  // const divEl44 = document.createElement("div");
  // divEl41.append(divEl44);
  // divEl28.append(divEl41);
  divEl26.append(divEl28);
  divEl4.append(divEl26);
  divEl3.append(divEl4);
  divEl2.append(divEl3);
  divEl.append(divEl2);
  container.append(divEl);

  block.textContent = "";
  block.append(container);
}
