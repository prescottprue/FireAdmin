import { compose } from 'redux'
import { withHandlers } from 'recompose'
import { withFirebase } from 'react-redux-firebase'
import { invoke } from 'lodash'
import CodeMirror from 'codemirror'
import { getCodeMirror } from './MigrationEditor.utils'

let firepadEditor

export default compose(
  withFirebase,
  withHandlers({
    setupEditor: ({ firebase, rtdbPath }) => el => {
      if (!rtdbPath) {
        throw new Error('Real Time DB path required to make editor')
      }
      // Called when unmounting
      if (el === null) {
        // Dispose of firepad instance
        return invoke(firepadEditor, 'dispose')
      }
      const doc = new CodeMirror.Doc('', 'javascript')
      const editor = getCodeMirror(el, doc)
      editor.setOption('theme', 'monokai')
      const Firepad = require('firepad')
      const fbRef = firebase.ref(rtdbPath)
      const settings = {
        defaultText: `// run custom code here\n// const someData = await admin.firebase.ref('some/path').once('value')`
      }
      try {
        firepadEditor = Firepad.fromCodeMirror(fbRef, editor, settings)
      } catch (err) {
        console.error('It threw :(') // eslint-disable-line
      }
      // editor.setOption('lineNumbers', false)
    }
  })
)
