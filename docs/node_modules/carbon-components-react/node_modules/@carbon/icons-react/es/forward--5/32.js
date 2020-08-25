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
var Forward_532 = React.forwardRef(function (_ref, ref) {
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
    d: 'M26 18A10 10 0 1 1 16 8h4v5l6-6-6-6v5h-4a12 12 0 1 0 12 12z'
  }), React.createElement('path', {
    d: 'M18.58 15.58h-3.45L15 18.15a4.83 4.83 0 0 1 .26-.45 1.59 1.59 0 0 1 .33-.35 1.53 1.53 0 0 1 .44-.23 2 2 0 0 1 .6-.08 2.54 2.54 0 0 1 .92.16 2.06 2.06 0 0 1 .74.48 2.28 2.28 0 0 1 .5.77 2.73 2.73 0 0 1 .18 1 2.87 2.87 0 0 1-.19 1.07 2.36 2.36 0 0 1-.55.84 2.44 2.44 0 0 1-.89.55 3.23 3.23 0 0 1-1.21.2 3.79 3.79 0 0 1-.94-.11 3 3 0 0 1-.74-.32 2.45 2.45 0 0 1-.55-.45 4.13 4.13 0 0 1-.41-.55l1.06-.81.27.41a1.82 1.82 0 0 0 .34.34 1.59 1.59 0 0 0 .43.22 1.52 1.52 0 0 0 .55.08 1.29 1.29 0 0 0 1-.36 1.41 1.41 0 0 0 .33-1v-.06a1.18 1.18 0 0 0-1.28-1.27 1.44 1.44 0 0 0-.77.18 1.94 1.94 0 0 0-.48.39l-1.19-.17.29-4.31h4.52z'
  }));
});
Forward_532.displayName = 'Forward_532';
Forward_532.propTypes = {
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
Forward_532.defaultProps = {
  width: 32,
  height: 32,
  viewBox: '0 0 32 32',
  xmlns: 'http://www.w3.org/2000/svg',
  preserveAspectRatio: 'xMidYMid meet'
};

export default Forward_532;
