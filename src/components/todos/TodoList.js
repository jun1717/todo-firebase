import React from 'react'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import Todo from './Todo'

const TodoList = ({ displayName, todos, isOwnTodos, onTodoClick }) => {
  const name = isOwnTodos ? 'あなた' : `${displayName} さん`;
  if (!isLoaded(todos)) {
    return <div>タスク一覧を読み込み中…</div>
  }
  if (isEmpty(todos)) {
    return <div>タスクがありません。</div>
  }

  return (
    <div>
      {displayName && <div>{name} のタスク一覧</div>}
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
    </div>
  )
}

TodoList.propTypes = {
  displayName: PropTypes.string,
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