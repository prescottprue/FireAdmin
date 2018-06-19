import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PermissionsTable from '../PermissionsTable'
import NewMemberModal from '../NewMemberModal'
import classes from './Permissions.scss'

export const Permissions = ({
  projectId,
  toggleNewMemberModal,
  permissionsSubmitting,
  newMemberModalOpen
}) => (
  <div className={classes.container}>
    <Typography className={classes.pageHeader}>Permissions</Typography>
    <div className={classes.buttons}>
      <Button
        disabled={permissionsSubmitting}
        color="primary"
        variant="raised"
        aria-label="Add Member"
        onClick={toggleNewMemberModal}>
        Add Member
      </Button>
    </div>
    <PermissionsTable projectId={projectId} />
    <NewMemberModal
      projectId={projectId}
      open={newMemberModalOpen}
      onRequestClose={toggleNewMemberModal}
    />
  </div>
)

Permissions.propTypes = {
  projectId: PropTypes.string.isRequired,
  permissionsSubmitting: PropTypes.bool.isRequired,
  toggleNewMemberModal: PropTypes.func.isRequired,
  newMemberModalOpen: PropTypes.bool.isRequired
}

export default Permissions
