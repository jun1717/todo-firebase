import React from 'react'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Todo from './Todo'

const styles = theme => ({
  message: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
})

const TodoList = ({ todos, isOwnTodos, onTodoClick, classes }) => {
  if (!isLoaded(todos)) {
    return <CircularProgress className={classes.message} />
  }
  if (isEmpty(todos)) {
    return <Typography variant="body1" className={classes.message}>タスクがありません。</Typography>
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
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TodoList)