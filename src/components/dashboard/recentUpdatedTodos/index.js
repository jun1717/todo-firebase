import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import UserUpdatedTodos from './UserUpdatedTodo'

const RecentUpdatedList = (todos) => {
  if (!isLoaded(todos)) {
    return <CircularProgress />
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

let RecentUpdatedTodos = ({ todos }) => {
  return (
    <Paper>
      <Typography variant="h5">最近の更新</Typography>
      {RecentUpdatedList(todos)}
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
  firebaseConnect(firebaseQueries),
  connect(
    mapStateToProps
  ))(RecentUpdatedTodos)

export default RecentUpdatedTodos;