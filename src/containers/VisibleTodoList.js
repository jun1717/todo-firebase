import { connect } from 'react-redux'
import { toggleTodo } from '../actions/todoActions'
import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../actions'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'

const getVisibleTodos = (todos, filter) => {
  if (!todos) return todos
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return Object.keys(todos)
        .filter(key => todos[key].completed)
        .reduce((filtered, key) => {
          filtered[key] = todos[key];
          return filtered;
        },
          {}
        )
    case 'SHOW_ACTIVE':
      return Object.keys(todos)
        .filter(key => !todos[key].completed)
        .reduce((filtered, key) => {
          filtered[key] = todos[key];
          return filtered;
        },
          {}
        )
    default:
      return todos;
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.firebase.data.todos, state.visibilityFilter)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = compose(
  firebaseConnect([
    'todos'
  ]),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ))(TodoList)

export default VisibleTodoList;