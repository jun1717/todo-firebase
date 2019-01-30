import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

const Title = ({ displayName, isOwnTodos }) => {
  const name = isOwnTodos ? 'あなた' : `${displayName} さん`;
  return (
    <React.Fragment>
      {displayName && <Typography variant="h5" gutterBottom>{name}のタスク一覧</Typography>}
    </React.Fragment>
  )
}

Title.propTypes = {
  displayName: PropTypes.string,
  isOwnTodos: PropTypes.bool.isRequired,
}

const firebaseQueries = ({ uid }) => (
  [
    { path: `users/${uid}/displayName`, type: 'once' },
  ]
)

const mapStateToProps = ({ firebase: { data: { users } } }, { uid }) => ({
  displayName: users && users[uid] && users[uid].displayName,
})

export default compose(
  firebaseConnect(firebaseQueries),
  connect(
    mapStateToProps
  ))(Title)