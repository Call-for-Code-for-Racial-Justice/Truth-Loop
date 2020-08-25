import { getAttributes } from '@carbon/icon-helpers';
import PropTypes from 'prop-types';
import React from 'react';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var defaultStyle = {
  "willChange": "transform"
};
var LogoSlack20 = React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      children = _ref.children,
      style = _ref.style,
      tabIndex = _ref.tabIndex,
      rest = _objectWithoutProperties(_ref, ["className", "children", "style", "tabIndex"]);

  var _getAttributes = getAttributes(_objectSpread({}, rest, {
    tabindex: tabIndex
  })),
      tabindex = _getAttributes.tabindex,
      props = _objectWithoutProperties(_getAttributes, ["tabindex"]);

  if (className) {
    props.className = className;
  }

  if (tabindex !== undefined && tabindex !== null) {
    props.tabIndex = tabindex;
  }

  if (_typeof(style) === 'object') {
    props.style = _objectSpread({}, defaultStyle, style);
  } else {
    props.style = defaultStyle;
  }

  if (ref) {
    props.ref = ref;
  }

  return React.createElement('svg', props, children, React.createElement('path', {
    d: 'M27 12.7c-2.48-8.25-6-10.17-14.3-7.72S2.53 11.05 5 19.3s6 10.17 14.29 7.69S29.47 20.98 27 12.7z'
  }), React.createElement('path', {
    d: 'M22 15.7l-1.55.52-1-3.09 1.55-.52a1.244 1.244 0 0 0-.79-2.36l-1.55.52-.54-1.61a1.243 1.243 0 0 0-2.36.78l.54 1.61-3.21 1.08-.53-1.65a1.26 1.26 0 0 0-1.56-.75 1.23 1.23 0 0 0-.78 1.57l.53 1.62-1.57.56a1.25 1.25 0 0 0-.79 1.58 1.28 1.28 0 0 0 1.15.84 1.07 1.07 0 0 0 .43-.06l1.55-.51 1 3.08-1.52.47a1.24 1.24 0 0 0-.78 1.6 1.27 1.27 0 0 0 1.15.84 1 1 0 0 0 .42-.06l1.55-.52.54 1.62a1.27 1.27 0 0 0 1.12.82 1 1 0 0 0 .42-.06 1.24 1.24 0 0 0 .79-1.57l-.54-1.61 3.21-1.08.56 1.62a1.31 1.31 0 0 0 1.16.84 1 1 0 0 0 .42-.06 1.23 1.23 0 0 0 .78-1.57l-.53-1.61 1.55-.52A1.25 1.25 0 1 0 22 15.7zm-7.12 2.41l-1-3.1 3.19-1.03 1 3.09z'
  }));
});
LogoSlack20.displayName = 'LogoSlack20';
LogoSlack20.propTypes = {
  'aria-hidden': PropTypes.bool,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.number,
  preserveAspectRatio: PropTypes.string,
  tabIndex: PropTypes.string,
  viewBox: PropTypes.string,
  width: PropTypes.number,
  xmlns: PropTypes.string
};
LogoSlack20.defaultProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 32 32',
  xmlns: 'http://www.w3.org/2000/svg',
  preserveAspectRatio: 'xMidYMid meet'
};

export default LogoSlack20;
