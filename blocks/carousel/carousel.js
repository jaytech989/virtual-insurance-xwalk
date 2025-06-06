
export default function decorate(block) {
  // each row is an accordion entry

  const accordions = [...block.children];

  // loop through all accordion blocks
  [...accordions].forEach((accordion) => {
    // generate the accordion
   console.log(accordion)
  });
}
