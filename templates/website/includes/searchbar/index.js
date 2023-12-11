const { cx, Include } = require('@bsi-cx/design-build');

/**
 * @type {Include}
 */
module.exports = cx.include
  .withIdentifier('searchbar-area-h0ENel')
  .withName('Searchbar')
  .withEditable(true)
  .withFile(require('./template.twig'))
  .withDropzones(
    cx.dropzone
      .withDropzone('searchbar-dropzone-8cXdia')
      .withMaxAllowedElements(1)
      .withAllowedElements(
        require('./../../../shared/content-elements/searchfield'))
  );