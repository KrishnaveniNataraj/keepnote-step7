import React from 'react';
import { mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';
import Header from '../../components/Header';
 
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

test('test Header page', () => {
    const wrapper = mount(<Header />);
    expect(wrapper).toMatchSnapshot();
});