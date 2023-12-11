require('./styles.scss')

const { cx, Icon } = require('@bsi-cx/design-build');

module.exports = cx
    .contentElement
    .withFile(require('./template.twig'))
    .withLabel('Suche (Header)')
    .withElementId('searchfield-NZcj1s')
    .withIcon(Icon.COMPASS)
    .withParts(
        cx.part.form
            .withLabel("Such-Formular")
            .withId('searchfield-form-N4X7Y0'), 
        cx.part.formField
            .withLabel('Suchfeld')
            .withId('searchfield-input-NEWehM'),
    )