/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import Dialog, {
  DialogTitle,
  DialogActions,
  DialogContent
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { required } from 'utils/form'

import classes from './NewProjectDialog.scss'

export const NewProjectDialog = ({
  open,
  onRequestClose,
  handleSubmit,
  pristine,
  reset,
  submitting,
  submit
}) => (
  <Dialog open={open} onClose={onRequestClose}>
    <DialogTitle id="new-title">New Project</DialogTitle>
    <DialogContent>
      <form onSubmit={handleSubmit} className={classes.inputs}>
        <Field
          name="name"
          component={TextField}
          label="Project Name"
          validate={[required]}
        />
      </form>
    </DialogContent>
    <DialogActions>
      <Button
        color="secondary"
        disabled={submitting}
        onTouchTap={() => {
          reset()
          onRequestClose && onRequestClose()
        }}>
        Cancel
      </Button>
      <Button
        color="primary"
        disabled={pristine || submitting}
        onTouchTap={submit}>
        Create
      </Button>
    </DialogActions>
  </Dialog>
)

NewProjectDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired, // added by redux-form
  pristine: PropTypes.bool.isRequired, // added by redux-form
  reset: PropTypes.func.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  submit: PropTypes.func.isRequired // added by redux-form
}

export default NewProjectDialog
