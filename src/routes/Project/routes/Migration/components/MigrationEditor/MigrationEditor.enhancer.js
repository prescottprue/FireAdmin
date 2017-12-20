import { compose } from 'redux'
import { withHandlers } from 'recompose'
import { withFirebase } from 'react-redux-firebase'
import { firebasePaths } from 'constants'
import CodeMirror from 'codemirror'
import { getCodeMirror } from './MigrationEditor.utils'

export default compose(
  withFirebase,
  withHandlers({
    setupEditor: ({ firebase, params: { projectId } }) => el => {
      const doc = new CodeMirror.Doc('', 'javascript')
      const editor = getCodeMirror(el, doc)
      editor.setOption('theme', 'monokai')
      const Firepad = require('firepad')
      const fbRef = firebase.ref(`${firebasePaths.migrations}/${projectId}`)
      const settings = {
        defaultText: `// run custom code here\n// const someData = await admin.firebase.ref('some/path').once('value')`
      }
      try {
        Firepad.fromCodeMirror(fbRef, editor, settings)
      } catch (err) {
        console.error('It threw :(') // eslint-disable-line
      }
      // editor.setOption('lineNumbers', false)
    }
  })
)
