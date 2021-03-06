import moment from 'moment'
import {
  ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_ERROR,
  TOGGLE_TODO_REQUEST, TOGGLE_TODO_SUCCESS, TOGGLE_TODO_ERROR,
  NOT_AUTHENTICATED_ON_TODO_ACTION, LOCATION_CHANGE_ON_TODOS,
} from './index'

const addTodoRequest = () => ({
  type: ADD_TODO_REQUEST
})

const addTodoSuccess = () => ({
  type: ADD_TODO_SUCCESS
})

const addTodoError = err => ({
  type: ADD_TODO_ERROR,
  err
})

const toggleTodoRequest = (text, completed) => ({
  type: TOGGLE_TODO_REQUEST,
  text,
  completed
})

const toggleTodoSuccess = (text, completed) => ({
  type: TOGGLE_TODO_SUCCESS,
  text,
  completed
})

const toggleTodoError = (text, completed, err) => ({
  type: TOGGLE_TODO_ERROR,
  text,
  completed,
  err
})

const notAuthenticatedOnTodoAction = () => ({
  type: NOT_AUTHENTICATED_ON_TODO_ACTION
})


export const addTodo = (uid, text) => {
  return (dispatch, getState, { getFirebase }) => {
    if (!uid) {
      dispatch(notAuthenticatedOnTodoAction());
      return;
    }
    dispatch(addTodoRequest());
    const firebase = getFirebase();
    const createdAt = moment().valueOf();
    firebase.push(`todos/${uid}`, {
      completed: false,
      text,
      _createdAt: createdAt,
      _updatedAt: createdAt
    })
      .then(() => {
        dispatch(addTodoSuccess());
      }).catch(err => {
        dispatch(addTodoError(err));
      });
  }
}

export const toggleTodo = (uid, id) => {  // #4
  return (dispatch, getState, { getFirebase }) => {
    if (!uid) {
      dispatch(notAuthenticatedOnTodoAction());
      return;
    }
    const firebase = getFirebase();
    const state = getState();
    const todo = state.firebase.data.todos[uid][id];
    dispatch(toggleTodoRequest(todo.text, !todo.completed));
    const updatedAt = moment().valueOf();
    firebase.update(`todos/${uid}/${id}`, {
      completed: !todo.completed,
      _updatedAt: updatedAt
    })
      .then(() => {
        dispatch(toggleTodoSuccess(todo.text, !todo.completed));
      }).catch(err => {
        dispatch(toggleTodoError(todo.text, !todo.completed, err));
      });
  }
}

export const locationChangeOnTodos = () => ({
  type: LOCATION_CHANGE_ON_TODOS
})