import React from 'react'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Todo from './Todo'

const TodoList = ({ todos, isOwnTodos, onTodoClick }) => {
  if (!isLoaded(todos)) {
    return <CircularProgress />
  }
  if (isEmpty(todos)) {
    return <Typography variant="body1">タスクがありません。</Typography>
  }

  return (
    <List>
      {Object.keys(todos).map(
        (key) => (
          <Todo
            key={key}
            isOwnTodos={isOwnTodos}
            {...todos[key]}
            onClick={isOwnTodos ? (() => onTodoClick(key)) : (() => { })}
          />
        )
      )}
    </List>
  )
}

TodoList.propTypes = {
  todos: PropTypes.objectOf(
    PropTypes.shape({
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    })
  ),
  onTodoClick: PropTypes.func.isRequired,
  isOwnTodos: PropTypes.bool.isRequired,
}

export default TodoList