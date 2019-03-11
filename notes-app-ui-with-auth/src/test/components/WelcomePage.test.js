import React from 'react';
import { shallow } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';
import WelcomePage from '../../components/WelcomePage';
 
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

test('test welcome page', () => {
    const wrapper = shallow(<WelcomePage />);
    expect(wrapper).toMatchSnapshot();
});