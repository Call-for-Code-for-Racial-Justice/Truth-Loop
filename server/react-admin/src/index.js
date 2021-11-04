import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'

import AdminApp from './AdminApp'

document.getElementById('root').style.maxWidth = '100vw'

ReactDOM.render(
  <BrowserRouter>
    <AdminApp />
  </BrowserRouter>,
  document.getElementById('root')
)
