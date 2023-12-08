import Alpine from 'alpinejs';

Alpine.data('filterTabelle', () => ({
    init() {
        // show only first 20 rows
        this.$root // div, wo x-data definiert ist
        this.$root.querySelector('table');
    },
    filterTable(searchEvent) {
        // filter Table
        this.$el // input-element, auf dem die function aufgerufen wird
        this.$el.value;
    },

  // Set header text to td:before for reverse table on mobile screens
  setHeaderTableMobile(table) {
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