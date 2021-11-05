import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { messages } from '../nls/nlsUtility'
import './filtermenu.scss'

const FilterMenu = forwardRef(({ show, intl, children }, ref) => {
  return (
    <div>
      {show && (
        <div className="menu-bg">
          <div className="menu-main" ref={ref}>
            <p>{intl.formatMessage(messages.filterBy)}</p>
            <div className="filters" data-testid="filterSelection">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  )
})
FilterMenu.propTypes = {
  show: PropTypes.bool,
  intl: PropTypes.any.isRequired,
  children: PropTypes.node,
}
FilterMenu.displayName = 'FilterMenu'
export default injectIntl(FilterMenu)
