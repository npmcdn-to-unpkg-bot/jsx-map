# jsxMap
> .map() for JSX

Allows modifing text deep in JSX tree Array#map() way, without the need to know anything about the the tree structure.

Works great with:
* [react-autolink](https://www.npmjs.com/package/react-autolink)
* [react-emoji](https://www.npmjs.com/package/react-emoji)
* _or anything else that expects text instead of JSX elements_

## Demo

[Here](http://vahnag.github.io/jsx-map/demo)

## Usage

`jsxMap(domTree, mapFunction [, filterFunction])`

Returns the same DOM tree with the chages applied via `mapFunction`.

The only argument `mapFunction` gets is a string and anything it returns will replace that string.

`filterFunction` is optional and can be used to skip some JSX elements. The argument it gets is the react element. If the returned value of the function is truthy it will continue going deep into the element to find the text, otherwise will skip the element and keep it as it is. By default all elements are `map`ped, so the default for `filterFunction` is `() => true`.

## Example

```js
import React from 'react';
import jsxMap from 'jsx-map';
import {emojify} from 'react-emoji';
import {autolink} from 'react-autolink';

const Comment = ({author, content}) => (
  <div className="comment">
    <header>Author: {author}</header>
    {/* here emojify returns JSX tree instead of string, 
    but autolink expects a string, so we map the strings to autolink */}
    <article>{
      jsxMap(
        emojify(content), 
        s => autolink(s),
        el => el.props.className !== 'comment-raw' // ignore the text inside the elements with class `comment-raw`
      )}</article>
  </div>
);
```

## Contributing

Issues and PRs are welcome.
