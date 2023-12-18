const { cx } = require('@bsi-cx/design-build');

module.exports = cx.style
  .withIdentifier('inter-table-filter-iKctsv')
  /*.withLabel('Footer color')*/
  .withLabel('Filter')
  .withCssClasses(
    cx.cssClass
      /*.withLabel('Primary color')*/
      .withLabel('Sichtbar')
      .withCssClass('show-search-filter'),
    cx.cssClass
      /*.withLabel('Secondary color')*/
      .withLabel('Unsichtbar')
      .withCssClass('hide-search-filter'),
  );