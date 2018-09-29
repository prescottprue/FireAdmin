import { firebasePaths, paths } from 'constants'
import { triggerAnalyticsEvent } from 'utils/analytics'

/**
 * Handler for creating a new action template
 * @param {Object} props - Component props
 * @param {Function} props.toggleNewDialog - Function which closes the new
 * Dialog
 * @param {Object} props.firestore - Firestore instance from firestoreConnect
 * @param {String} props.uid - Component props
 */
export function createNewActionTemplate(props) {
  return async newTemplate => {
    try {
      const newTemplateWithMeta = {
        public: false,
        ...newTemplate,
        createdBy: props.uid,
        createdAt: props.firestore.FieldValue.serverTimestamp()
      }
      const addResponse = await props.firestore.add(
        firebasePaths.actionTemplates,
        newTemplateWithMeta
      )
      props.toggleNewDialog()
      props.showSuccess('New action template created successfully')
      triggerAnalyticsEvent('createActionTemplate', {
        templateId: addResponse.id,
        templateName: newTemplateWithMeta.name,
        templateIsPublic: newTemplateWithMeta.public
      })
    } catch (err) {
      const errMsg = 'Error creating new template'
      console.error(errMsg, err.message || err) // eslint-disable-line no-console
      Raven.captureException(err)
      props.showError(errMsg)
      throw err
    }
  }
}

/**
 * Handler for deleting an action template
 * @param {Object} props - Component props
 */
export function deleteTemplate(props) {
  return async templateId => {
    try {
      // TODO: Add delete confirmation
      await props.firestore.delete(firebasePaths.actionTemplates)
      triggerAnalyticsEvent('deleteActionTemplate', {
        uid: props.uid,
        templateId
      })
      props.showSuccess('Action template deleted successfully')
    } catch (err) {
      const errMsg = 'Error deleting action template'
      console.error(errMsg, err.message || err) // eslint-disable-line no-console
      Raven.captureException(err)
      props.showError(errMsg)
      throw err
    }
  }
}

/**
 * Handler for going to template
 * @param {Object} props - Component props
 */
export function goToTemplate(props) {
  return id => props.router.push(`${paths.actionTemplates}/${id}`)
}
