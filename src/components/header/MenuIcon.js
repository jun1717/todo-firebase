import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'

const MenuIcon = ({ uid }) => (
  < React.Fragment >
    {uid &&
      <Tooltip title="編集">
        <IconButton color="inherit" component={Link} to={`/users/${uid}/todos`} aria-label="編集">
          <EditIcon />
        </IconButton>
      </Tooltip>
    }
  </React.Fragment >
)

MenuIcon.propTypes = {
  uid: PropTypes.string
}

const mapStateToProps = state => (
  { uid: state.firebase.auth.uid }
)

export default connect(
  mapStateToProps
)(MenuIcon)