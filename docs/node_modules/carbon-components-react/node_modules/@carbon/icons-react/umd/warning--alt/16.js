(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@carbon/icon-helpers'), require('prop-types'), require('react')) :
  typeof define === 'function' && define.amd ? define(['@carbon/icon-helpers', 'prop-types', 'react'], factory) :
  (global.WarningAlt16 = factory(global.CarbonIconHelpers,global.PropTypes,global.React));
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
  var WarningAlt16 = React.forwardRef(function (_ref, ref) {
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
      d: 'M14.5 14h-13c-.2 0-.3-.1-.4-.2-.1-.2-.1-.3 0-.5l6.5-12c.1-.3.4-.4.6-.2.1 0 .2.1.2.2l6.5 12c.1.2.1.3 0 .5 0 .1-.2.2-.4.2zM2.3 13h11.3L8 2.5 2.3 13z'
    }), React.createElement('path', {
      d: 'M7.5 6h1v3.5h-1zm.5 4.8c-.4 0-.8.3-.8.8s.3.8.8.8c.4 0 .8-.3.8-.8s-.4-.8-.8-.8z'
    }));
  });
  WarningAlt16.displayName = 'WarningAlt16';
  WarningAlt16.propTypes = {
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
  WarningAlt16.defaultProps = {
    width: 16,
    height: 16,
    viewBox: '0 0 16 16',
    xmlns: 'http://www.w3.org/2000/svg',
    preserveAspectRatio: 'xMidYMid meet'
  };

  return WarningAlt16;

})));
