import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import SidebarLayout from 'layouts/SidebarLayout'
import { renderChildren } from 'utils/router'
import ActionsRoute from 'routes/Projects/routes/Project/routes/Actions'
import BucketConfigRoute from 'routes/Projects/routes/Project/routes/BucketConfig'
import EnvironmentsRoute from 'routes/Projects/routes/Project/routes/Environments'
import PermissionsRoute from 'routes/Projects/routes/Project/routes/Permissions'
import ProjectEventsRoute from 'routes/Projects/routes/Project/routes/ProjectEvents'
import OverviewPanel from '../OverviewPanel'
import { makeStyles } from '@material-ui/core/styles'
import styles from './ProjectPage.styles'

const useStyles = makeStyles(styles)

function ProjectPage({ project, match, projectId, uid, children }) {
  const classes = useStyles()

  return (
    <SidebarLayout title={project.name}>
      <Switch>
        {/* Child routes */}
        {renderChildren(
          [
            ActionsRoute,
            BucketConfigRoute,
            EnvironmentsRoute,
            PermissionsRoute,
            ProjectEventsRoute
          ],
          match,
          { project, projectId, uid }
        )}
        {/* Main Route */}
        <Route
          path="/projects/:projectId"
          render={() => (
            <div className={classes.root}>
              <Typography className={classes.pageHeader}>Overview</Typography>
              <OverviewPanel project={project} projectId={projectId} />
            </div>
          )}
        />
      </Switch>
    </SidebarLayout>
  )
}

ProjectPage.propTypes = {
  project: PropTypes.object,
  projectId: PropTypes.string,
  uid: PropTypes.string,
  match: PropTypes.object,
  children: PropTypes.object
}

export default ProjectPage
