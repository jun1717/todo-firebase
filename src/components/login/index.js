import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import Button from '@material-ui/core/Button'
import { loginWithGoogle, logout } from '../../actions/authActions'

let Login = ({ auth, loginWithGoogle, logout }) => {
  if (!isLoaded(auth)) {
    return (<div>ログイン中...</div>);
  }
  if (isEmpty(auth)) {
    return (
      <Button variant="contained" color="primary" onClick={loginWithGoogle}>Googleアカウントでログイン</Button>
    )
  }
  return (
    <div>
      {auth.displayName} さん
      <Button variant="contained" color="primary" onClick={logout}>ログアウト</Button>
    </div>
  );
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loginWithGoogle: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => (
  { auth: state.firebase.auth }
)

const mapDispatchToProps = dispatch => {
  return {
    loginWithGoogle: () => dispatch(loginWithGoogle()),
    logout: () => dispatch(logout()),
  }
}

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default Login;