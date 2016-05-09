import React from 'react';

const jsxMap = (tree, callback, filterFunction = (() => true)) => {
  if (typeof tree === 'string') return callback(tree);
  if (Array.isArray(tree)) return tree.map(el => jsxMap(el, callback, filterFunction));

  if (!filterFunction(tree)) return tree;

  if (tree.props && tree.props.children) {
    if (Array.isArray(tree.props.children)) {
      return React.cloneElement(tree, {
        children: jsxMap(tree.props.children, callback, filterFunction),
      });
    }

    return React.cloneElement(tree, {
      children: jsxMap(tree.props.children, callback, filterFunction),
    });
  }

  return tree;
};

export default jsxMap;
