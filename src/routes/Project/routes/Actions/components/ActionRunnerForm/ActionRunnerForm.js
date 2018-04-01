import React from 'react'
import PropTypes from 'prop-types'
import { get, map } from 'lodash'
import Button from 'material-ui/Button'
import { Field } from 'redux-form'
import { Link } from 'react-router'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import Grid from 'material-ui/Grid'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import CollectionSearch from 'components/CollectionSearch'
import { Select } from 'redux-form-material-ui'
import { FormControl } from 'material-ui/Form'
import { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { ListItemText } from 'material-ui/List'
import { databaseURLToProjectName } from 'utils'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel'
import TabContainer from 'components/TabContainer'
import { paths } from 'constants'
import ActionInput from '../ActionInput'
import StepsViewer from '../StepsViewer'
import PrivateActionTemplates from '../PrivateActionTemplates'
import classes from './ActionRunnerForm.scss'

export const ActionRunnerForm = ({
  selectedTemplate,
  inputsExpanded,
  toggleSteps,
  stepsExpanded,
  projectId,
  toggleInputs,
  templateName,
  toggleTemplateEdit,
  selectActionTemplate,
  templateEditExpanded,
  project,
  environments,
  selectTab,
  selectedTab
}) => (
  <div className={classes.container}>
    <ExpansionPanel
      expanded={templateEditExpanded}
      onChange={toggleTemplateEdit}
      className={classes.panel}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.sectionHeader}>
          {templateName}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className="flex-column">
        <Typography paragraph>
          Run an action by selecting a template, filling in the template's
          configuation options, then clicking <strong>run action</strong>.
        </Typography>
        <div className={classes.tabs}>
          <Link to={paths.actionTemplates}>
            <Button color="primary" className={classes.button}>
              Create New Action Template
            </Button>
          </Link>
          <div className={classes.or}>
            <Typography className={classes.orFont}>
              or select existing
            </Typography>
          </div>
          <AppBar position="static">
            <Tabs value={selectedTab} onChange={selectTab} fullWidth>
              <Tab label="Public" />
              <Tab label="Private" />
            </Tabs>
          </AppBar>
          {selectedTab === 0 && (
            <TabContainer>
              <div className={classes.search}>
                <CollectionSearch
                  indexName="actionTemplates"
                  onSuggestionClick={selectActionTemplate}
                />
              </div>
            </TabContainer>
          )}
          {selectedTab === 1 && (
            <TabContainer>
              <PrivateActionTemplates onTemplateClick={selectActionTemplate} />
            </TabContainer>
          )}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    {selectedTemplate ? (
      <ExpansionPanel expanded={inputsExpanded} onChange={toggleInputs}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Environments</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.inputs}>
          {selectedTemplate.environments ? (
            selectedTemplate.environments.map((input, index) => (
              <ExpansionPanel
                defaultExpanded
                className={classes.panel}
                key={index}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <div style={{ display: 'block' }}>
                    <Typography className={classes.title}>
                      {get(input, `name`) || `Environment ${index + 1}`}
                    </Typography>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <FormControl className={classes.field}>
                    <InputLabel htmlFor="environment">
                      Select An Environment
                    </InputLabel>
                    <Field
                      name={`environments.${index}`}
                      component={Select}
                      fullWidth
                      inputProps={{
                        name: 'environment',
                        id: 'environment'
                      }}>
                      {map(environments, (environment, environmentKey) => (
                        <MenuItem
                          key={environmentKey}
                          value={{
                            environmentKey,
                            databaseURL: environment.databaseURL
                          }}>
                          <ListItemText
                            primary={environment.name || environmentKey}
                            secondary={databaseURLToProjectName(
                              environment.databaseURL
                            )}
                          />
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))
          ) : (
            <div className="flex-row-center">No Environments</div>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ) : null}
    {selectedTemplate ? (
      <ExpansionPanel expanded={inputsExpanded} onChange={toggleInputs}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Inputs</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.inputs}>
          {selectedTemplate.inputs
            ? selectedTemplate.inputs.map((input, index) => (
                <ActionInput
                  key={index}
                  name={`inputValues.${index}`}
                  inputs={selectedTemplate.inputs}
                  inputMeta={get(selectedTemplate.inputs, index)}
                  {...{ index, environments, projectId }}
                />
              ))
            : null}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ) : null}
    {selectedTemplate ? (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Steps</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={24} style={{ flexGrow: 1 }}>
            <Grid item xs={12} lg={6}>
              {selectedTemplate && selectedTemplate.steps ? (
                <StepsViewer steps={selectedTemplate.steps} activeStep={0} />
              ) : null}
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ) : null}
  </div>
)

ActionRunnerForm.propTypes = {
  project: PropTypes.object,
  selectTab: PropTypes.func.isRequired,
  selectedTab: PropTypes.number,
  templateName: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  toggleInputs: PropTypes.func.isRequired,
  toggleSteps: PropTypes.func.isRequired,
  selectActionTemplate: PropTypes.func.isRequired,
  toggleTemplateEdit: PropTypes.func.isRequired,
  inputsExpanded: PropTypes.bool.isRequired,
  templateEditExpanded: PropTypes.bool.isRequired,
  stepsExpanded: PropTypes.bool.isRequired,
  selectedTemplate: PropTypes.object,
  environments: PropTypes.object
}

export default ActionRunnerForm
