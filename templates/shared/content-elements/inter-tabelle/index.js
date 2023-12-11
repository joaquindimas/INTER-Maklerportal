require('./styles.scss')

const { cx, Icon } = require('@bsi-cx/design-build');

module.exports = cx
  .contentElement
  .withFile(require('./template.twig'))
  .withElementId('inter-tabelle-217858')
  .withLabel('Inter-Tabelle')
  .withDescription('Tabelle mit Filter')
  .withIcon(Icon.TABLE)
  .withStyleConfigs(
    require('@bsi-cx/design-standard-library-web/configs/styles/table-color'),
    require('@bsi-cx/design-standard-library-web/configs/styles/shadow'),
    require('@bsi-cx/design-standard-library-web/configs/styles/border'),
  )
  .withParts(
    cx.part.plainText
      .withLabel('Filter')
      .withId('inter-tabelle-filter-text-uYjVGH'),
    cx.part.table
      .withId('inter-tabelle-tabelle-403312')
      .withLabel('Tabelle'));