import Alpine from 'alpinejs';

Alpine.data('interTabelle', () => ({
  table: null,
  init() {
    // show only first 20 rows
    this.$root // div, wo x-data definiert ist
    this.table = this.$root.querySelector('table');
  },
  filterTabelle() {
    // filter Table
    let filter = this.$el.innerText // input-element, auf dem die function aufgerufen wird
    // this.$el.value;
    if (filter) {
      console.error('Filter: ' + this.$el.innerText);
      let allRows = Array.from(this.table.querySelectorAll('tr'));
      allRows.shift();
      allRows.forEach(row => {
        if (row.innerText.includes(filter)) {
          row.classList.remove('d-none');
          console.error("Sichtbar:" + row.innerText);
        } else {
          row.classList.add('d-none');
          console.error("Unsichtbar:" + row.innerText);
        }
    });
    }
  },

  // Set header text to td:before for reverse table on mobile screens
  setHeaderTableMobile() {
    let table = this.$el;
    let header = table.getElementsByTagName('th');
    let data = table.getElementsByTagName('td');

    for (let i = 0; i < header.length; ++i) {
      let counter = 0;
      let multiplier = 0;
      for (let j = 0; j < data.length; ++j) {
        if (counter === header.length) {
          counter = 0;
          ++multiplier;
        }
        if ((j - multiplier * header.length) === i) {
          data[j].setAttribute('data-header', header[i].textContent);
        }
        ++counter;
      }
    }
  },
}))