(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@carbon/icon-helpers'), require('prop-types'), require('react')) :
  typeof define === 'function' && define.amd ? define(['@carbon/icon-helpers', 'prop-types', 'react'], factory) :
  (global.Hearing24 = factory(global.CarbonIconHelpers,global.PropTypes,global.React));
}(this, (function (iconHelpers,PropTypes,React) { 'use strict';

  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  React = React && React.hasOwnProperty('default') ? React['default'] : React;

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

  function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
  var defaultStyle = {
    "willChange": "transform"
  };
  var Hearing24 = React.forwardRef(function (_ref, ref) {
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
      d: 'M18 30v-2a10.011 10.011 0 0 0 10-10h2a12.013 12.013 0 0 1-12 12z'
    }), React.createElement('path', {
      d: 'M18 26v-2a6.007 6.007 0 0 0 6-6h2a8.01 8.01 0 0 1-8 8z'
    }), React.createElement('path', {
      d: 'M18 22v-2a2.002 2.002 0 0 0 2-2h2a4.004 4.004 0 0 1-4 4zM10 2a9.01 9.01 0 0 0-9 9h2a7 7 0 0 1 14 0 7.09 7.09 0 0 1-3.501 6.135l-.499.288v3.073a2.935 2.935 0 0 1-.9 2.151 4.182 4.182 0 0 1-4.633 1.03A4.092 4.092 0 0 1 5 20H3a6.116 6.116 0 0 0 3.67 5.512 5.782 5.782 0 0 0 2.314.486 6.585 6.585 0 0 0 4.478-1.888A4.94 4.94 0 0 0 15 20.496v-1.942A9.108 9.108 0 0 0 19 11a9.01 9.01 0 0 0-9-9z'
    }), React.createElement('path', {
      d: 'M9.28 8.082A3.006 3.006 0 0 1 13 11h2a4.979 4.979 0 0 0-1.884-3.911 5.041 5.041 0 0 0-4.281-.957 4.95 4.95 0 0 0-3.703 3.703 5.032 5.032 0 0 0 2.304 5.458A3.078 3.078 0 0 1 9 17.924V20h2v-2.077a5.06 5.06 0 0 0-2.537-4.346 3.002 3.002 0 0 1 .817-5.495z'
    }));
  });
  Hearing24.displayName = 'Hearing24';
  Hearing24.propTypes = {
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
  Hearing24.defaultProps = {
    width: 24,
    height: 24,
    viewBox: '0 0 32 32',
    xmlns: 'http://www.w3.org/2000/svg',
    preserveAspectRatio: 'xMidYMid meet'
  };

  return Hearing24;

})));
