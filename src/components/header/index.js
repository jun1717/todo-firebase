import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MenuIcon from './MenuIcon'
import Login from './Login'

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
})

const Header = ({ classes }) => (
  <AppBar className={classes.appBar}>
    <Toolbar>
      <Typography variant="h6" color="inherit" component={Link} to="/">
        タスク管理アプリ
      </Typography>
      <div className={classes.grow}></div>
      <MenuIcon />
      <Login />
    </Toolbar>
  </AppBar>
)

Header.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Header)