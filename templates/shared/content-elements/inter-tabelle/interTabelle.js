import Alpine from 'alpinejs';

Alpine.data('interTabelle', () => ({
  table: null,
  allRows: null,
  tableHeader: null,
  initClass:'init',
  filterClass: 'filter-hide',
  paginationClass: 'pagination-hide',
  activeClass: 'active',
  currentSort: null,
  batchSize: null,
  pages: null,
  init() {
    this.table = this.$root.querySelector('table');
    this.allRows = Array.from(this.table.querySelectorAll('tr'));
    this.tableHeader = this.allRows.shift();
    this.tableHeader.querySelectorAll('th').forEach((headerCell, i) => headerCell.setAttribute('x-on:click', 'sortColumn(' + i + ')'));
  },
  initFilter() {
    this.$root.querySelector('input').value = this.$el.innerText;
    this.filterTabelle();
    this.table.classList.remove(this.initClass);
  },
  initPagination() {
    let paginationStr = this.$el.innerText
    if (!!parseInt(paginationStr)) {
      this.batchSize = parseInt(paginationStr);
      this.paginateTable();
    } else {
      this.$root.querySelector('.pages').classList.add('hide');
    }
    this.table.classList.remove(this.initClass);
  },
  filterTabelle() {
    let filter = this.$el.innerText || this.$el.value;
    if (filter) {
      filter = filter.toLowerCase();
      this.allRows.forEach(row => {
        let cells = Array.from(row.querySelectorAll('td'));
        let rowText = cells.map(cell => cell.innerText).join(' ').toLowerCase();
        if (rowText.includes(filter)) {
          row.classList.remove(this.filterClass);
        } else {
          row.classList.add(this.filterClass);
        }
      });
    } else {
      this.allRows.forEach(row => row.classList.remove(this.filterClass));
    }
    this.paginateTable();
  },

  compareValues(rowA, rowB, isNumeric, isReverse) {
    let a = rowA.sort;
    let b = rowB.sort;
    var order = isReverse ? -1 : 1;
    if (isNumeric) {
      return order * (a - b);
    }
    return order * a.localeCompare(b, 'de');
  },

  sortColumn(i) {
    let isReverse = false;
    if (this.currentSort) {
      if (this.currentSort[0] == i) {
        isReverse = !this.currentSort[1];
      }
      this.tableHeader.querySelectorAll('th').forEach(row => {
        row.classList.remove('sort-desc');
        row.classList.remove('sort-asc');
      })
    }
    this.currentSort = [i, isReverse];
    if (isReverse) {
      this.$el.classList.add('sort-desc');
      this.$el.classList.remove('sort-asc');
    } else {
      this.$el.classList.add('sort-asc');
      this.$el.classList.remove('sort-desc');
    }

    let values = this.allRows.map(row => row.querySelectorAll('td')[i].innerText);
    let isDate = values.every(item => !item || /\d{1,2}\.\d{1,2}\.\d{2,4}/.test(item))
    let isNumeric = true
    if (isDate) {
      values = values.map(item => item.split('.'))
        .map(strArray => (strArray.length == 3) ? new Date(strArray[2], strArray[1] - 1, strArray[0]) : new Date())
    } else {
      let numericValues = values
        .map(item => item.replaceAll('.', '').replace('€', '').replace(',', '.'))
        .map(item => !!item ? Number(item) : -1);
      if (numericValues.every(item => !Number.isNaN(item))) {
        values = numericValues;
      } else {
        isNumeric = false;
      }
    }
    this.allRows.forEach((row, i) => row.sort = values[i]);
    this.allRows.sort((a, b) => this.compareValues(a, b, isNumeric, isReverse));
    this.allRows.forEach(row => this.table.querySelector('tbody').appendChild(row));
    this.paginateTable();
  },
  paginateTable() {
    if (this.batchSize) {
      let pages = this.$root.querySelector('.pages');
      pages.innerHTML = '';
      let len = this.allRows.filter(row => !row.classList.contains(this.filterClass)).length;
      if (this.batchSize < len) {
        for (let i = 0; i < len / this.batchSize; i += 1) {
          let newLink = document.createElement('a');
          // newLink.setAttribute('href', '#');
          newLink.setAttribute('x-on:click', 'showBatch(' + i + ')');
          newLink.innerText = Math.min((i + 1) * this.batchSize, len);
          pages.appendChild(newLink);
        }
        pages.classList.remove('hide');
      } else {
        pages.classList.add('hide');
      }
      this.showBatch(0);
    }
  },
  showBatch(i) {
    let allPages = this.$root.querySelector('.pages').querySelectorAll('a');
    allPages.forEach(link => link.classList.remove('active'));
    if (allPages.length > i) {
      allPages[i].classList.add('active');
    }
    let minIndex = this.batchSize * i;
    let maxIndex = minIndex + this.batchSize;
    this.allRows.filter(row => !row.classList.contains(this.filterClass)).forEach((el, i) => {
      if (minIndex <= i && i < maxIndex) { el.classList.remove(this.paginationClass) }
      else { el.classList.add(this.paginationClass) }
    });
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