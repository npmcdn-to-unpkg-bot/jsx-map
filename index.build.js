(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('jsxMap', ['exports', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React);
    global.jsxMap = mod.exports;
  }
})(this, function (exports, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var jsxMap = function jsxMap(tree, callback) {
    var filterFunction = arguments.length <= 2 || arguments[2] === undefined ? function () {
      return true;
    } : arguments[2];

    if (typeof tree === 'string') return callback(tree);
    if (Array.isArray(tree)) return tree.map(function (el) {
      return jsxMap(el, callback, filterFunction);
    });

    if (!filterFunction(tree)) return tree;

    if (tree.props && tree.props.children) {
      if (Array.isArray(tree.props.children)) {
        return _react2.default.cloneElement(tree, {
          children: jsxMap(tree.props.children, callback, filterFunction)
        });
      }

      return _react2.default.cloneElement(tree, {
        children: jsxMap(tree.props.children, callback, filterFunction)
      });
    }

    return tree;
  };

  exports.default = jsxMap;
});
