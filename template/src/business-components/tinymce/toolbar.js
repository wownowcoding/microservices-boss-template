// Here is a list of the toolbar
// Detail list see https://www.tinymce.com/docs/advanced/editor-control-identifiers/#toolbarcontrols
import { marginSet } from './toolbar/marginSet'

const toolbar = [
  `undo redo | bold italic underline strikethrough| fontselect | fontsizeselect | formatselect  | forecolor backcolor casechange lineheight ${marginSet} removeformat`,
  'blockquote subscript superscript hr emoticons charmap numlist bullist checklist |  alignleft aligncenter alignright alignjustify | outdent indent | searchreplace',
  // 'image media link table'
  'image link table xxxx fullscreen'
]

export default toolbar
