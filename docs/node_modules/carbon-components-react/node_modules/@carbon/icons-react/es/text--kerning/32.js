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
var TextKerning32 = React.forwardRef(function (_ref, ref) {
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
    d: 'M30 24H18.83l2.29-2.29-1.41-1.42L15 25l4.71 4.71 1.41-1.42L18.83 26H30v-2zm-16-3l6-17h-2l-6 17h2zM13 4L9 16 5 4H3l5 14h2l5-14h-2zm15 14h2L25 4h-2l-5 14h2l1-3h6zm-6.33-5L24 6l2.33 7z'
  }));
});
TextKerning32.displayName = 'TextKerning32';
TextKerning32.propTypes = {
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
TextKerning32.defaultProps = {
  width: 32,
  height: 32,
  viewBox: '0 0 32 32',
  xmlns: 'http://www.w3.org/2000/svg',
  preserveAspectRatio: 'xMidYMid meet'
};

export default TextKerning32;
