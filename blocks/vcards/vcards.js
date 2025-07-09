import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const insuranceData = [
    {
      img: "/media_15dcd10bf5de582b0804ef6e8a8b07ab67501c90b.jpg",
      alt: "starting-premium",
      label: "Starting Premium",
      value: "₹276/month"
    },
    {
      img: "/media_1798ea776a62ca51875a83696b06597fe755423a0.jpg",
      alt: "hospital",
      label: "Network Hospital",
      value: "16334"
    },
    {
      img: "/media_1653b116aeeb96482a51cab52e460fedd15cb46f0.jpg",
      alt: "coverage-icon",
      label: "PED Coverage",
      value: "Covered after 3 yrs"
    },
    {
      img: "/media_1a01ddcdb224a8c8b699c88a4be9bb780759beb0b.png",
      alt: "sum-insured",
      label: "Sum Insured",
      value: "Up to 1Cr"
    }
  ];

  const ul = document.createElement('ul');

  insuranceData.forEach((item) => {
    const li = document.createElement('li');

    // Image container
    const imageDiv = document.createElement('div');
    imageDiv.className = 'cards-card-image';
    const optimizedPicture = createOptimizedPicture(item.img, item.alt, false, [{ width: '750' }]);
    imageDiv.append(optimizedPicture);

    // Text container
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'cards-card-body';
    const labelP = document.createElement('p');
    labelP.textContent = item.label;
    const valueP = document.createElement('p');
    valueP.innerHTML = `<strong>${item.value}</strong>`;
    bodyDiv.append(labelP, valueP);

    li.append(imageDiv, bodyDiv);
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
