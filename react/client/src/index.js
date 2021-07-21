import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'

import { configureStore } from './store/index'
import App from './App'

document.getElementById('root').style.maxWidth = '100vw'

const globalStore = configureStore()
const app = 
  <Provider store={globalStore}>
    <App />
  </Provider>

const root = document.getElementById('root')

ReactDOM.render(app, root)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint.
reportWebVitals();
