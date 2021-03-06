import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'

let Navbar = ({ uid }) => (
  <div>
    <NavLink exact to='/' activeStyle={{ fontWeight: "bold", color: "#DF3A01" }}>Home</NavLink>&nbsp;
    <NavLink exact to={`/users/${uid}/todos`} activeStyle={{ fontWeight: "bold", color: "#DF3A01" }}>タスクを編集する</NavLink>
  </div>
)

Navbar.propTypes = {
  uid: PropTypes.string
}

const mapStateToProps = state => (
  { uid: state.firebase.auth.uid }
)

Navbar = withRouter(connect(
  mapStateToProps
)(Navbar))

export default Navbar;