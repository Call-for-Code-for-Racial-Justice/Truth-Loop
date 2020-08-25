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
var Settings16 = React.forwardRef(function (_ref, ref) {
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
    d: 'M13.5 8.4v-.8l1-.8c.4-.3.4-.9.2-1.3l-1.2-2c-.2-.3-.5-.5-.9-.5-.1 0-.2 0-.3.1l-1.2.4c-.2-.1-.4-.3-.7-.4l-.3-1.3c0-.5-.4-.8-.9-.8H6.8c-.5 0-.9.3-1 .8l-.2 1.3c-.3.1-.5.2-.7.3L3.7 3h-.3c-.4 0-.7.2-.9.5l-1.2 2c-.2.4-.1.9.3 1.3l.9.9v.8l-.9.7c-.4.3-.5.9-.2 1.3l1.2 2c.1.3.4.5.8.5.1 0 .2 0 .3-.1l1.2-.4c.2.1.4.3.7.4l.3 1.3c.1.5.5.8 1 .8h2.4c.5 0 .9-.3 1-.8l.3-1.3c.2-.1.4-.2.7-.4l1.2.4c.1 0 .2.1.3.1.4 0 .7-.2.9-.5l1.1-2c.2-.4.2-.9-.2-1.3l-1.1-.8zm-.9 3.6l-1.7-.6c-.4.3-.9.6-1.4.8L9.2 14H6.8l-.4-1.8c-.5-.2-.9-.5-1.4-.8l-1.6.6-1.2-2 1.4-1.2c-.1-.5-.1-1.1 0-1.6L2.2 6l1.2-2 1.7.6c.4-.4.9-.6 1.4-.8L6.8 2h2.4l.4 1.8c.5.2.9.5 1.4.8l1.6-.6 1.2 2-1.4 1.2c.1.5.1 1.1 0 1.6l1.4 1.2-1.2 2z'
  }), React.createElement('path', {
    d: 'M8 11c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3c0 1.6-1.3 3-3 3zm0-5c-1.1 0-2 .8-2 1.9V8c0 1.1.8 2 1.9 2H8c1.1 0 2-.8 2-1.9V8c0-1.1-.8-2-2-2 .1 0 0 0 0 0z'
  }));
});
Settings16.displayName = 'Settings16';
Settings16.propTypes = {
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
Settings16.defaultProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  xmlns: 'http://www.w3.org/2000/svg',
  preserveAspectRatio: 'xMidYMid meet'
};

module.exports = Settings16;
