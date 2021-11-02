import React from 'react'
import './AdminHomeRoute.scss'

const AdminHomeRoute = () => {
  return (
    <div className="admin-home-content" data-testid={'adminHomeContent'}>
      <div className="bx--grid bx--grid--full-width bx--grid--no-gutter ">
        <div className="bx--row">
          <div className="bx--col">Welcome to the TruthLoop Server Administration UI</div>
        </div>
      </div>
    </div>
  )
}

export default AdminHomeRoute
