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
var Function32 = React.forwardRef(function (_ref, ref) {
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
    d: 'M8.5 30a2.5 2.5 0 0 1 0-5c.63-.07 2.35-1.53 2.49-7.22l-1.78-.45a2.92 2.92 0 0 1 0-5.66l1.79-.46C11.55 4 19.32 2 23.5 2a2.5 2.5 0 0 1 0 5c-.08 0-2.23.15-2.48 4.22l1.77.45a2.92 2.92 0 0 1 0 5.66l-1.79.46C20.49 29.86 8.62 30 8.5 30zm15-26c-.43 0-10.5.11-10.5 8v.78l-3.3.83a.92.92 0 0 0 0 1.78l3.3.83V17c0 9.72-4 10-4.5 10a.5.5 0 0 0 0 1c.43 0 10.5-.17 10.5-11v-.78l3.3-.83a.92.92 0 0 0 0-1.78l-3.3-.83V12c0-6.92 4.46-7 4.5-7a.5.5 0 0 0 0-1z'
  }), React.createElement('path', {
    d: 'M4.15 23.46a14 14 0 0 1 6.46-20.38l.77 1.84A12 12 0 0 0 5.85 22.4zm17.24 5.46l-.77-1.84a12 12 0 0 0 5.49-17.54l1.69-1.08a14 14 0 0 1-6.41 20.46z'
  }));
});
Function32.displayName = 'Function32';
Function32.propTypes = {
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
Function32.defaultProps = {
  width: 32,
  height: 32,
  viewBox: '0 0 32 32',
  xmlns: 'http://www.w3.org/2000/svg',
  preserveAspectRatio: 'xMidYMid meet'
};

export default Function32;
