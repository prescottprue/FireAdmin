import React from 'react'
import PropTypes from 'prop-types'
import { get, startCase } from 'lodash'
import { Field } from 'redux-form'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel'
import Typography from 'material-ui/Typography'
import { TextField } from 'redux-form-material-ui'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import classes from './ActionInput.scss'

export const ActionInput = ({ inputMeta, name, index }) => (
  <ExpansionPanel defaultExpanded className={classes.container}>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <div style={{ display: 'block' }}>
        <Typography className={classes.title}>
          {get(inputMeta, `name`) || `Input ${index + 1}`}
        </Typography>
        {get(inputMeta, `type`, null) && (
          <Typography className={classes.type}>
            Type: {startCase(get(inputMeta, `type`))}
          </Typography>
        )}
      </div>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Field
        name={name}
        component={TextField}
        label="Name"
        className={classes.field}
      />
    </ExpansionPanelDetails>
  </ExpansionPanel>
)

ActionInput.propTypes = {
  inputMeta: PropTypes.object,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired // eslint-disable-line react/no-unused-prop-types
}

export default ActionInput
