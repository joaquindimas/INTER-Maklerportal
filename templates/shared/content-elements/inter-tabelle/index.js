require('./styles.scss')

const {cx, Icon} = require('@bsi-cx/design-build');

module.exports = cx
  .contentElement
  .withFile(require('./template.twig'))
  .withElementId('filter-tabelle-217858')
  .withLabel('Filter-Tabelle')
  .withDescription('Tabelle mit Filter')
  .withIcon(Icon.TABLE)
  .withStyleConfigs(
    require('../../../../configs/styles/table-color'),
    require('../../../../configs/styles/shadow'),
    require('../../../../configs/styles/border'))
  .withParts(
    cx.part.table
      .withId('filter-tabelle-tabelle-403312')
      .withLabel('Tabelle'));