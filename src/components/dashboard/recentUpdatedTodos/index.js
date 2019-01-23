import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import UserUpdatedTodos from './UserUpdatedTodo'

const RecentUpdatedList = (todos) => {
  if (!isLoaded(todos)) {
    return <div>読み込み中…</div>
  }
  if (isEmpty(todos)) {
    return <div>データがありません。</div>
  }
  return (
    <ul>
      {todos.map(({ key, value: todo }) =>  // #4
        <UserUpdatedTodos key={key} {...todo} />
      )}
    </ul>
  )
}

let RecentUpdatedTodos = ({ todos }) => {
  return (
    <div>
      <h1>最近の更新</h1>
      {RecentUpdatedList(todos)}
    </div>
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