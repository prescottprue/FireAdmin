import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { startCase } from 'lodash'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import FormLabel from '@material-ui/core/FormLabel'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DeleteIcon from '@material-ui/icons/Delete'
import { triggerAnalyticsEvent, createProjectEvent } from 'utils/analytics'
import DeleteMemberModal from '../DeleteMemberModal'
import styles from './RolesTableRow.styles'
import { useUser, useFirestore } from 'reactfire'
import useNotifications from 'modules/notification/useNotifications'
import { PROJECTS_COLLECTION } from 'constants/firebasePaths'

const resourcesOptions = [
  { value: 'members' },
  { value: 'environments' },
  { value: 'roles' },
  { value: 'permissions' }
]

const editOptions = ['Delete']
const ITEM_HEIGHT = 48
const useStyles = makeStyles(styles)

function RolesTableRow({
  projectId,
  currentRoles,
  name,
  roleKey,
  initialValues,
  updateRolesDisabled
}) {
  const classes = useStyles()
  const user = useUser()
  const firestore = useFirestore()
  const { FieldValue } = useFirestore
  const { showSuccess } = useNotifications()
  const [anchorEl, changeAnchorEl] = useState(null)
  const [deleteDialogOpen, changeDeleteDialogOpen] = useState(false)
  const handleDeleteClose = () => changeDeleteDialogOpen(false)
  const handleMenuClick = (e) => changeAnchorEl(e.target)
  const handleMenuClose = () => changeAnchorEl(null)
  const startDelete = () => {
    changeAnchorEl(null)
    changeDeleteDialogOpen(true)
  }
  const {
    register,
    reset,
    handleSubmit,
    formState: { dirty, isSubmitting }
  } = useForm({ defaultValues: initialValues })

  async function deleteRole(item) {
    await firestore.doc(`${PROJECTS_COLLECTION}/${projectId}`).set(
      {
        roles: {
          [roleKey]: FieldValue.delete()
        }
      },
      { merge: true }
    )
    // Write event to project events
    await createProjectEvent(
      { projectId, firestore, FieldValue },
      {
        eventType: 'deleteRole',
        eventData: { roleKey },
        createdBy: user.uid
      }
    )
    showSuccess('Role deleted successfully!')
    triggerAnalyticsEvent('deleteRole', { projectId, roleKey })
  }

  async function updateRole(roleUpdates) {
    await firestore.doc(`${PROJECTS_COLLECTION}/${projectId}`).set(
      {
        roles: {
          [roleKey]: {
            permissions: roleUpdates
          }
        }
      },
      { merge: true }
    )
    // Write event to project events
    await createProjectEvent(
      { projectId, firestore, FieldValue },
      {
        eventType: 'updateRole',
        eventData: { roleKey },
        createdBy: user.uid
      }
    )
    showSuccess('Role updated successfully!')
    triggerAnalyticsEvent('updateRole', {
      projectId,
      roleName: roleKey
    })
  }

  return (
    <>
      <DeleteMemberModal
        open={deleteDialogOpen}
        name={roleKey}
        onRequestClose={handleDeleteClose}
        onDeleteClick={deleteRole}
      />
      <Accordion
        key={roleKey}
        className={classes.root}
        data-test={`role-panel-${roleKey}`}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {name || startCase(roleKey)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form className={classes.content} onSubmit={handleSubmit(updateRole)}>
            <Divider />
            <div className={classes.menu}>
              <IconButton
                aria-label="More"
                aria-owns="long-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
                data-test={`role-more-${roleKey}`}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200
                  }
                }}>
                {editOptions.map((option) => (
                  <MenuItem
                    key={option}
                    onClick={startDelete}
                    data-test="role-delete">
                    <ListItemIcon className={classes.icon}>
                      <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.primary }}
                      primary="Delete Role"
                    />
                  </MenuItem>
                ))}
              </Menu>
            </div>
            <Typography className={classes.resourcePermissionsHeader}>
              Resource Permissions
            </Typography>
            <div className={classes.roleSelect}>
              <div className={classes.optionsLabels}>
                {resourcesOptions.map((option, idx) => (
                  <FormLabel
                    key={`${option.value}-${idx}`}
                    className={classes.optionLabel}>
                    {startCase(option.value)}
                  </FormLabel>
                ))}
              </div>
              <div className={classes.roleOptions}>
                <span>Create</span>
                {resourcesOptions.map((option, idx) => (
                  <FormControlLabel
                    key={`${option.value}-${idx}`}
                    className={classes.roleOption}
                    control={
                      <Checkbox
                        name={`create.${option.value}`}
                        disabled={updateRolesDisabled}
                        data-test={`create-option-${option.value}`}
                        inputRef={register}
                      />
                    }
                  />
                ))}
              </div>
              <div className={classes.roleOptions}>
                <span>Read</span>
                {resourcesOptions.map((option, idx) => (
                  <FormControlLabel
                    key={`${option.value}-${idx}`}
                    className={classes.roleOption}
                    control={
                      <Checkbox
                        name={`read.${option.value}`}
                        disabled={updateRolesDisabled}
                        data-test={`read-option-${option.value}`}
                        inputRef={register}
                      />
                    }
                  />
                ))}
              </div>
              <div className={classes.roleOptions}>
                <span>Update</span>
                {resourcesOptions.map((option, idx) => (
                  <FormControlLabel
                    key={`${option.value}-${idx}`}
                    className={classes.roleOption}
                    control={
                      <Checkbox
                        name={`update.${option.value}`}
                        disabled={updateRolesDisabled}
                        data-test={`update-option-${option.value}`}
                        inputRef={register}
                      />
                    }
                  />
                ))}
              </div>
              <div className={classes.roleOptions}>
                <span>Delete</span>
                {resourcesOptions.map((option, idx) => (
                  <FormControlLabel
                    key={`${option.value}-${idx}`}
                    className={classes.roleOption}
                    control={
                      <Checkbox
                        name={`delete.${option.value}`}
                        disabled={updateRolesDisabled}
                        data-test={`delete-option-${option.value}`}
                        inputRef={register}
                      />
                    }
                  />
                ))}
              </div>
            </div>
            <div className={classes.buttons}>
              <Button
                disabled={!dirty}
                color="secondary"
                aria-label="Cancel Role Update"
                onClick={reset}
                style={{ marginRight: '2rem' }}
                data-test="role-cancel">
                Cancel
              </Button>
              <Button
                disabled={updateRolesDisabled || isSubmitting}
                color="primary"
                variant="contained"
                aria-label="Update Role"
                type="submit"
                data-test="role-update">
                Update Role
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

RolesTableRow.propTypes = {
  projectId: PropTypes.string.isRequired,
  currentRoles: PropTypes.object,
  initialValues: PropTypes.object,
  name: PropTypes.string,
  updateRolesDisabled: PropTypes.bool,
  roleKey: PropTypes.string.isRequired
}

export default RolesTableRow
