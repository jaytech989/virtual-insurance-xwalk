// import{getContentFragmentData} from '../../scripts/cf-service.js'
/* this function also gets called by accordion-group */
export function generateAccordionDOM(block) {
  console.log('acc  blok', block);

  const details = document.createElement('details');
  const summary = document.createElement('summary');
  details.append(summary);
  Array.from(block.children).forEach((element, i) => {
    if (i === 0) {
      const heading = element.querySelector('h2,h3,h4,h5,h6');
      summary.append(heading || element.textContent.trim());
    } else {
      if (element.children[0].getAttribute('data-aue-prop') === 'heading') {
        element.children[0].classList.add('acc_title');
      } else if (element.children[0].getAttribute('data-aue-prop') === 'body') {
        element.firstChild.classList.add('acc_body');
      }
      details.append(element);
    }
  });
  return details;
}

export default function decorate(block) {
  const dom = generateAccordionDOM(block);
  block.textContent = '';
  block.append(dom);
}
