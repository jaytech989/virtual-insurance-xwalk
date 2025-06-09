import { CIRCLEICON } from '../../scripts/constants.js';
import { decorateButtons } from '../../scripts/aem.js';

function hasNumber(myString) {
  return /\d/.test(myString);
}

function hasUlList(div) {
  const ul = div.querySelector('ul');
  let list = false;
  if (ul !== null) {
    list = true;
  }
  return list;
}

export default async function decorate(block) {
  const [title, showHeader, totalColumns, tableVariation, ...rows] = block.children;

  const columnOptions = {
    twoCol: 2,
    threeCol: 3,
    fourCol: 4,
  };

  const selectedOption = totalColumns.textContent.trim();
  const columns = columnOptions[selectedOption];

  const tableContainer = document.createElement('div');
  tableContainer.classList.add('table-container');

  const tableTitle = document.createElement('div');
  tableTitle.classList.add('table-title');
  tableTitle.innerHTML = `<h3>${title.textContent} </h3>`;
  tableContainer.appendChild(tableTitle);

  /* Table component  */
  const table = document.createElement('table');

  let variation = '';
  if (tableVariation && tableVariation.textContent !== undefined) {
    variation = tableVariation.textContent.trim();
  } else {
    variation = 'default';
  }

  rows.forEach((rowDiv, rowIndex) => {
   
    const row = document.createElement('tr');
    [...rowDiv.attributes].forEach(({ nodeName, nodeValue }) => {
      row.setAttribute(nodeName, nodeValue);
    });

    const rowCells = [...rowDiv.children].slice(0, columns);


      table.classList.add('table-default');
      table.classList.add(totalColumns.textContent.trim());
      rowCells.forEach((cellDiv) => {
        const cell =
          showHeader.textContent.trim() === 'true' && rowIndex === 0
            ? document.createElement('th')
            : document.createElement('td');

        cell.appendChild(cellDiv);

        row.appendChild(cell);
      });


    table.appendChild(row);
  });
  tableContainer.appendChild(table);

  block.textContent = '';
  block.appendChild(tableContainer);
}
