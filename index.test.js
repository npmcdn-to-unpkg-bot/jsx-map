import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import jsxMap from './index.js';

test('basic map', t => {
  const component = <div>foo</div>;
  const expected = <div>baz</div>;
  const wrapper = shallow(
    jsxMap(
      component
      , () => 'baz')
  );


  t.true(wrapper.equals(expected));
});

test('nested map', t => {
  const fn = () => 'foo';
  const component = (
    <div className="foo-bar" onClick={fn}>
      foo
      <div>bar<strong>baz</strong></div>
    </div>
  );
  const expected = (
    <div className="foo-bar" onClick={fn}>
      qux
      <div>qux<strong>qux</strong></div>
    </div>
  );
  const wrapper = shallow(
    jsxMap(
      component
      , () => 'qux')
  );


  t.true(wrapper.equals(expected));
});

test.only('filter function', t => {
  const fn = () => 'foo';
  const component = (
    <div className="foo-bar" onClick={fn}>
      foo
      <a>bar<strong>baz</strong></a>
    </div>
  );
  const expected = (
    <div className="foo-bar" onClick={fn}>
      qux
      <a>bar<strong>baz</strong></a>
    </div>
  );
  const wrapper = shallow(
    jsxMap(
      component
      , () => 'qux'
      , (el) => el.type !== 'a'
    )
  );


  t.true(wrapper.equals(expected));
});
