import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import Paper from 'material-ui-next/Paper'
import Button from 'material-ui-next/Button'
import Typography from 'material-ui-next/Typography'
import { paths } from 'constants'
import classes from './OverviewPanel.scss'

export const OverviewPanel = ({
  name,
  projectPath,
  environmentsEmpty,
  numberOfEnvironments
}) => (
  <Paper className={classes.container}>
    <span className={classes.name}>{name}</span>
    <div className={classes.columns}>
      <div className={classes.column}>
        <Typography type="headline" component="h2">
          Environments
        </Typography>
        <div className={classes.columnInner}>
          {environmentsEmpty ? (
            <div>
              <p className={classes.description}>
                Managing different phases of a project is simplified by creating
                "Environments". Bigger projects commonly run a production
                environment along with multiple staging and development
                environments.
              </p>
            </div>
          ) : (
            <div className={classes.environments}>
              Current Environments:
              {numberOfEnvironments}
            </div>
          )}
        </div>
        <Link to={`${projectPath}/${paths.projectEnvironments}`}>
          <Button raised color="primary">
            Go To Environments
          </Button>
        </Link>
      </div>
      <div className={classes.column}>
        <Typography type="headline" component="h2">
          Migrations
        </Typography>
        <div>
          <p className={classes.description}>
            Moving data is a nessesary part of any real world application.
            Migrations allow you to move data in a repeatability and reversable
            way with a complete logs of actions along the way
          </p>
        </div>
        <Link to={`${projectPath}/${paths.projectDataMigration}`}>
          <Button raised color="primary" disabled={environmentsEmpty}>
            Go To Migrations
          </Button>
        </Link>
      </div>
    </div>
  </Paper>
)

OverviewPanel.propTypes = {
  name: PropTypes.string, // from enhancer (mapProps)
  projectPath: PropTypes.string, // from enhancer (mapProps)
  numberOfEnvironments: PropTypes.number, // from enhancer (mapProps)
  environmentsEmpty: PropTypes.bool.isRequired // from enhancer (mapProps)
}

export default OverviewPanel
