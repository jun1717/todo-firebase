import React from 'react'
import RecentUpdatedTodos from './recentUpdatedTodos/'
import PropTypes from 'prop-types'  // 追加
import { withStyles } from '@material-ui/core/styles'  // 追加

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 5,
  },
  content: {
    maxWidth: 800,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})

const Dashboard = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.content}>
      <RecentUpdatedTodos />
    </div>
  </div>
)

Dashboard.PropTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Dashboard)