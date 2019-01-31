import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import UserUpdatedTodos from './UserUpdatedTodo'

const styles = theme => ({
  title: {
    paddingTop: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
  },
  message: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
  }
})

const RecentUpdatedList = (todos, classes) => {
  if (!isLoaded(todos)) {
    return <CircularProgress className={classes.message} />
  }
  if (isEmpty(todos)) {
    return <Typography variant="body1">データがありません。</Typography>
  }
  return (
    <div>
      <List>
        {todos.map(({ key, value: todo }) =>
          <UserUpdatedTodos key={key} {...todo} />
        )}
      </List>
    </div>
  )
}

let RecentUpdatedTodos = ({ todos, classes }) => {
  return (
    <Paper>
      <Typography variant="h5" className={classes.title}>最近の更新</Typography>
      {RecentUpdatedList(todos, classes)}
    </Paper>
  )
}
RecentUpdatedTodos.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.object.isRequired,
    })
  ),
  classes: PropTypes.object.isRequired,
}

const firebaseQueries = ({ uid }) => (
  [
    { path: `recentUpdatedTodos`, type: 'once', queryParams: ['orderByChild=_updatedAt', 'limitToLast=10'] }  // #1
  ]
)

const mapStateToProps = ({ firebase: { ordered: { recentUpdatedTodos } } }) => {  // #2
  return {
    todos: recentUpdatedTodos && recentUpdatedTodos.reverse()  // #3
  }
}

RecentUpdatedTodos = compose(
  withStyles(styles),
  firebaseConnect(firebaseQueries),
  connect(
    mapStateToProps
  ))(RecentUpdatedTodos)

export default RecentUpdatedTodos;