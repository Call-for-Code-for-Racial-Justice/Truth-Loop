'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var iconHelpers = require('@carbon/icon-helpers');
var PropTypes = _interopDefault(require('prop-types'));
var React = _interopDefault(require('react'));

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var defaultStyle = {
  "willChange": "transform"
};
var Departure20 = React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      children = _ref.children,
      style = _ref.style,
      tabIndex = _ref.tabIndex,
      rest = _objectWithoutProperties(_ref, ["className", "children", "style", "tabIndex"]);

  var _getAttributes = iconHelpers.getAttributes(_objectSpread({}, rest, {
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
    d: 'M2 28h28v2H2zM13.48 5.15l5.69 8.14.8 1.15 1.35-.36 4.52-1.21a2.13 2.13 0 0 1 1.12 0A1.84 1.84 0 0 1 28.23 14 1.87 1.87 0 0 1 27 16.45l-18.71 5a1.78 1.78 0 0 1-1 0A1.87 1.87 0 0 1 6 20.12l-.25-.93L5 16.38l-.74-2.74 1.44-.39 2.3 3.1.81 1.08 1.31-.35 2.8-.75 1.94-.52-.52-1.93-2.26-8.36 1.4-.37M14.16 3a1.06 1.06 0 0 0-.5 0l-3.09.83A1 1 0 0 0 9.89 5l2.5 9.36-2.81.75-2.73-3.61a1 1 0 0 0-.52-.36 1.06 1.06 0 0 0-.5 0L2.72 12A1 1 0 0 0 2 13.16l1 3.74.75 2.8.25.94a3.87 3.87 0 0 0 2.74 2.74 3.91 3.91 0 0 0 2 0l18.7-5a3.84 3.84 0 0 0 0-7.44 4.27 4.27 0 0 0-2.16 0l-4.51 1.21-6.07-8.74a1 1 0 0 0-.54-.41z'
  }));
});
Departure20.displayName = 'Departure20';
Departure20.propTypes = {
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
Departure20.defaultProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 32 32',
  xmlns: 'http://www.w3.org/2000/svg',
  preserveAspectRatio: 'xMidYMid meet'
};

module.exports = Departure20;
