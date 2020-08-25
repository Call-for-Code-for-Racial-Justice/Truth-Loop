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
var CloudSnow20 = React.forwardRef(function (_ref, ref) {
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
    d: 'M23.5 22h-15A6.5 6.5 0 0 1 7.2 9.14a9 9 0 0 1 17.6 0A6.5 6.5 0 0 1 23.5 22zM16 4a7 7 0 0 0-6.94 6.14L9 11h-.86a4.5 4.5 0 0 0 .36 9h15a4.5 4.5 0 0 0 .36-9H23l-.1-.82A7 7 0 0 0 16 4zm-4 21.05L10.95 24 9.5 25.45 8.05 24 7 25.05l1.45 1.45L7 27.95 8.05 29l1.45-1.45L10.95 29 12 27.95l-1.45-1.45L12 25.05zm14 0L24.95 24l-1.45 1.45L22.05 24 21 25.05l1.45 1.45L21 27.95 22.05 29l1.45-1.45L24.95 29 26 27.95l-1.45-1.45L26 25.05zm-7 2L17.95 26l-1.45 1.45L15.05 26 14 27.05l1.45 1.45L14 29.95 15.05 31l1.45-1.45L17.95 31 19 29.95l-1.45-1.45L19 27.05z'
  }));
});
CloudSnow20.displayName = 'CloudSnow20';
CloudSnow20.propTypes = {
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
CloudSnow20.defaultProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 32 32',
  xmlns: 'http://www.w3.org/2000/svg',
  preserveAspectRatio: 'xMidYMid meet'
};

module.exports = CloudSnow20;
