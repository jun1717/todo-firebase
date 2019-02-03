import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { loginWithGoogle, logout } from '../../actions/authActions'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'

const styles = theme => ({
  noTransform: {
    textTransform: 'none',
  },
  avatar: {
    margin: theme.spacing.unit,
  },
})

class Login extends React.Component {
  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { auth, profile, loginWithGoogle, logout, classes } = this.props
    const { anchorEl } = this.state

    if (!isLoaded(auth)) {
      return <CircularProgress color="inherit" />
    }
    if (isEmpty(auth)) {
      return (
        <Button variant="contained" color="primary" onClick={loginWithGoogle} className={classes.noTransform}>Googleアカウントでログイン</Button>
      )
    }
    return (
      <React.Fragment>
        <Button
          color="inherit"
          aria-owns={anchorEl ? 'user-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          className={classes.noTransform}
        >
          {profile.displayName} さん
        </Button>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={logout}>ログアウト</MenuItem>
        </Menu>
        {profile.avatarUrl && <Avatar alt={profile.displayName} src={profile.avatarUrl} className={classes.avatar} />}
      </React.Fragment>
    )
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loginWithGoogle: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  profile: PropTypes.shape({
    displayName: PropTypes.string,
    avatarUrl: PropTypes.string
  }).isRequired,
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
}
)

const mapDispatchToProps = dispatch => {
  return {
    loginWithGoogle: () => dispatch(loginWithGoogle()),
    logout: () => dispatch(logout()),
  }
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ))(Login)