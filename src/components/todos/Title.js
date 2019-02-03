import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

const styles = theme => ({
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing.unit,
  },
})

const Title = ({ displayName, avatarUrl, isOwnTodos, classes }) => {
  const name = isOwnTodos ? 'あなた' : `${displayName} さん`;
  return (
    <div className={classes.row}>
      {avatarUrl && <Avatar alt={displayName} src={avatarUrl} className={classes.avatar} />}
      {displayName && <Typography variant="h5">{name}のタスク一覧</Typography>}
    </div>
  )
}

Title.propTypes = {
  displayName: PropTypes.string,
  isOwnTodos: PropTypes.bool.isRequired,
  avatarUrl: PropTypes.string,
  classes: PropTypes.object.isRequired,
}

const firebaseQueries = ({ uid }) => (
  [
    { path: `users/${uid}/displayName`, type: 'once' },
    { path: `users/${uid}/avatarUrl`, type: 'once' },
  ]
)

const mapStateToProps = ({ firebase: { data: { users } } }, { uid }) => ({
  displayName: users && users[uid] && users[uid].displayName,
  avatarUrl: users && users[uid] && users[uid].avatarUrl,
})

export default compose(
  withStyles(styles),
  firebaseConnect(firebaseQueries),
  connect(
    mapStateToProps
  ))(Title)