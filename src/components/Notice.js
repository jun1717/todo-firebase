import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar';
import { closeNotice } from '../actions/noticeActions'
import LevelSnackbarContentWrapper from './util/snackbar/LevelSnackbarContentWrapper'


const Notice = ({ text, level, open, handleClose }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    open={open}
    autoHideDuration={30000}
    onClose={handleClose}
  >
    <LevelSnackbarContentWrapper
      onClose={handleClose}
      variant={level}
      message={text}
    />
  </Snackbar>
)

Notice.propTypes = {
  text: PropTypes.string.isRequired,
  level: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    text: state.notice.text,
    level: state.notice.level,
    open: state.notice.open,
  }
}

const mapDispatchToProps = (dispatch, { uid }) => ({
  handleClose: () => {
    dispatch(closeNotice())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notice)