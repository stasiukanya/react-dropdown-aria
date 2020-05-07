import React from 'react';
import { mount, ReactWrapper, HTMLAttributes } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { createSerializer } from 'jest-emotion';
import * as emotion from 'emotion';
import Dropdown, { Option } from '../index';
import DropdownTest from './DropdownTest';
import { CUSTOM_OPTIONS, OPTIONS, GROUPED_OPTIONS } from './constants';
import { KEY_CODES } from '../utils/constants';

expect.addSnapshotSerializer(createSerializer(emotion as any));

// tslint:disable-next-line: no-empty
const foo = (val: Option) => {};

describe('Check Props', () => {
  it('Matches snapshot with default props', () => {
    const dropdown = mount(<Dropdown onChange={foo} />);
    expect(toJson(dropdown)).toMatchSnapshot();
  });

  it('Matches snapshot with custom props', () => {
    const dropdown = mount(
      <Dropdown
        placeholder="Custom Placeholder..."
        className="custom-class"
        id="dropdown"
        ariaLabel="React Simple Dropdown"
        options={CUSTOM_OPTIONS}
        onChange={foo}
        disabled
        width={400}
        maxContentHeight={150}
      />,
    );
    expect(toJson(dropdown)).toMatchSnapshot();
  });

  it('Matches snapshot with grouped options', () => {
    const dropdown = mount(<Dropdown onChange={foo} options={GROUPED_OPTIONS} />);
    expect(toJson(dropdown)).toMatchSnapshot();
  });
});

describe('Navigation', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  let button: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  let input: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  let listContainer: ReactWrapper<HTMLAttributes, Readonly<{}>, React.Component<{}, {}, any>>;

  beforeEach(() => {
    wrapper = mount(<DropdownTest onChange={foo} />);
    button = wrapper.find('.test').first(); // Actual dropdown button element
    listContainer = wrapper.find('ul').first();
    input = wrapper.find('input').first();


    // Do some action so that focus is in correct place
    wrapper.simulate('keyDown', { key: 'downArrow', keyCode: KEY_CODES.DOWN_ARROW, preventDefault: foo });
  });

  const dropdownValue = () => wrapper.find('.dropdown-selector-value').first().text();
  const getWrapperDisplayProp = () => getComputedStyle(listContainer.getDOMNode()).getPropertyValue('display');
  const pressEnter = (comp = input) =>  comp.simulate('keyDown', { key: 'enter', keyCode: KEY_CODES.ENTER, preventDefault: foo });
  const keyDown = (comp = input) => comp.simulate('keyDown', { key: 'downArrow', keyCode: KEY_CODES.DOWN_ARROW, preventDefault: foo });

  it('Opens dropdown when clicked', () => {
    button.simulate('click');

    expect(getWrapperDisplayProp()).toBe('block');
  });

  it('Opens dropdown with enter key', () => {
    button.simulate('keyDown', { key: 'enter', keyCode: KEY_CODES.ENTER, preventDefault: foo });

    expect(getWrapperDisplayProp()).toBe('block');
  });

  it('Closes when clicked again', () => {
    button.simulate('click');
    expect(getWrapperDisplayProp()).toBe('block');

    button.simulate('click');
    expect(getWrapperDisplayProp()).toBe('none');
  });

  it('Closes when enter pressed again', () => {
    pressEnter(input)
    expect(getWrapperDisplayProp()).toBe('block');

    pressEnter(input)
    expect(getWrapperDisplayProp()).toBe('none');
  });

  it('Closes when tab key pressed', () => {
    button.simulate('click');
    expect(getWrapperDisplayProp()).toBe('block');

    button.simulate('keyDown', { key: 'tab', keyCode: KEY_CODES.TAB });
    expect(getWrapperDisplayProp()).toBe('none');
  });

  it('Closes when esc pressed', () => {
    button.simulate('click');
    expect(getWrapperDisplayProp()).toBe('block');

    button.simulate('keyDown', { key: 'escape', keyCode: KEY_CODES.ESCAPE, preventDefault: foo });
    expect(getWrapperDisplayProp()).toBe('none');
  });

  it('Arrow key selects first element in list', () => {
    input.simulate('click');
    // keyDown(input);
    pressEnter(input);
    pressEnter(input);

    expect(dropdownValue()).toBe('1');
  });

  it('Arrow key nav loops arround', () => {
    button.simulate('click');
    for (let i = 0; i < 10; i += 1) {
      keyDown(input);
    }
    pressEnter(input);

    expect(dropdownValue()).toBe('1');
  });
});

describe('Selecting Options', () => {
  let spy: any;

  beforeEach(() => {
    spy = sinon.spy();
  });

  it('calls onChange with value when option selected', () => {
    const wrapper = mount(<Dropdown options={OPTIONS} onChange={spy} className="test" />);
    const button = wrapper.find('.test').first();

    button.simulate('click');
    wrapper.find('ul').childAt(0).simulate('click', { target: { innerText: '1' } });

    expect(spy.calledWith({ value: '1' })).toBe(true);
  });

  it('sets dropdown text to selected item', () => {
    const wrapper = mount(<DropdownTest onChange={foo} />);
    const button = wrapper.find('.test').first();

    button.simulate('click');
    wrapper.find('ul').childAt(0).simulate('click', { target: { innerText: '1' } });

    expect(wrapper.find('.dropdown-selector-value').first().text()).toBe('1');
  });
});

describe('Special props', () => {
  it('Does not open when disabled', () => {
    const wrapper = mount(<Dropdown options={OPTIONS} onChange={foo} className="test" disabled />);
    wrapper.find('.test').first().simulate('click');
    const listContainer = wrapper.find('ul').first();

    expect(getComputedStyle(listContainer.getDOMNode()).getPropertyValue('display')).toBe('none');
  });
});
