import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import firebase from 'firebase'
import { MuiThemeProvider } from '@material-ui/core/styles'  // 追加
import { theme } from './materialui/theme'
import todoApp from './reducers'
import App from './components/App'
import firebaseConfig from './firebase/config'

firebase.initializeApp(firebaseConfig);

const createStoreWithFirebase = compose(
  applyMiddleware(thunk.withExtraArgument({ getFirebase })),
  reactReduxFirebase(firebase, { userProfile: 'users', preserveOnLogout: ['todos', 'users', 'recentUpdatedTodos'] })
)(createStore);

const store = createStoreWithFirebase(todoApp);

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)