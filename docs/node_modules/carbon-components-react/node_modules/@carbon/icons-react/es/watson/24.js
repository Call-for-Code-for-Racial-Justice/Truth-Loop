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
var Watson24 = React.forwardRef(function (_ref, ref) {
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
    d: 'M21.74 9.49A11.41 11.41 0 0 0 16 8a.76.76 0 1 0 0 1.51 10.15 10.15 0 0 1 1.91.21c-2.26 1.08-4.76 3.58-6.73 7a22.48 22.48 0 0 0-2 4.44A9.58 9.58 0 0 1 7 17.22a3.43 3.43 0 0 1 .28-2.66c.79-1.37 2.44-2.15 4.63-2.2a.76.76 0 0 0 .74-.78.75.75 0 0 0-.78-.74c-2.68.04-4.77 1.08-5.87 2.9a4.84 4.84 0 0 0-.44 3.79 12 12 0 0 0 3.2 5.22A11.36 11.36 0 0 0 8.52 26a10 10 0 0 1-2-3.48.75.75 0 0 0-.95-.52.76.76 0 0 0-.49 1 11.45 11.45 0 0 0 5.18 6.38A11.42 11.42 0 0 0 16 30.92a11.74 11.74 0 0 0 3-.39 11.48 11.48 0 0 0 2.77-21zm-3.16 19.57a9.9 9.9 0 0 1-7.56-1c-.86-.49-1.21-2-.94-4a18.85 18.85 0 0 0 2.48 1.72 13.92 13.92 0 0 0 6.93 2 11 11 0 0 0 2.42-.28 9.78 9.78 0 0 1-3.33 1.56zm6.06-4.66c-2 2-6.66 2.74-11.32.05a17.36 17.36 0 0 1-2.89-2.12 21.08 21.08 0 0 1 2.08-4.91c2.94-5.08 6.83-7.57 8.47-6.62a10 10 0 0 1 3.66 13.6zM4.16 11.72L1.14 10a.76.76 0 1 0-.76 1.31L3.4 13a.86.86 0 0 0 .38.1.77.77 0 0 0 .66-.38.76.76 0 0 0-.28-1zm4.13-4.13a.74.74 0 0 0 .65.41.75.75 0 0 0 .38-.1.76.76 0 0 0 .28-1l-1.74-3a.76.76 0 0 0-1-.27.75.75 0 0 0-.28 1zM16 6.08a.76.76 0 0 0 .76-.76V1.83a.76.76 0 0 0-1.52 0v3.49a.76.76 0 0 0 .76.76zm6.68 1.79a.75.75 0 0 0 1-.28l1.75-3a.75.75 0 0 0-.28-1 .76.76 0 0 0-1 .27l-1.74 3a.76.76 0 0 0 .27 1.01zm9.22 2.38a.76.76 0 0 0-1-.27l-3 1.74a.76.76 0 0 0-.28 1 .77.77 0 0 0 .66.38.86.86 0 0 0 .38-.1l3-1.75a.76.76 0 0 0 .24-1z'
  }));
});
Watson24.displayName = 'Watson24';
Watson24.propTypes = {
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
Watson24.defaultProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 32 32',
  xmlns: 'http://www.w3.org/2000/svg',
  preserveAspectRatio: 'xMidYMid meet'
};

export default Watson24;
