import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const cardImage = document.createElement('div');
    cardImage.className = 'cards-card-image';

    const cardBody = document.createElement('div');
    cardBody.className = 'cards-card-body';

    const cols = [...row.children];
    let hasContent = false;

    // Variables to hold button text and link URL
    let buttonText = '';
    let buttonLink = '';

    cols.forEach((col, index) => {
      // const textValue = col.textContent.trim();
      // if (!textValue) return; // skip empty

      hasContent = true;

      // Handle image column
      const picture = col.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cardImage.append(optimizedPic);
        return;
      }
      const textValue = col.textContent.trim();
      if (!textValue) return; // skip empty

      switch (index) {

        case 1:
          col.className = 'card-heading';
          cardBody.append(col);
          break;

        case 2:
          col.className = 'card-published-date';

          cardBody.append(col);
          break;

        case 3:
          col.className = 'card-description';
          cardBody.append(col);
          break;

        case 4:
          buttonText = textValue;
          break;

        case 5:
          buttonLink = textValue;
          break;

        default:
          col.className = 'card-extra';
          cardBody.append(col);
          break;
      }
    });

    // Create button div only if buttonText or buttonLink exist
    if (buttonText || buttonLink) {
      const buttonWrapper = document.createElement('div');
      buttonWrapper.className = 'card-button';


      if (buttonLink) {
        const a = document.createElement('a');
        a.href = buttonLink;
        a.textContent = buttonText || buttonLink; // button text if available, else fallback to link URL
        buttonWrapper.appendChild(a);
      }

      cardBody.appendChild(buttonWrapper);
    }

    if (!hasContent) return;

    li.append(cardImage, cardBody);
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
