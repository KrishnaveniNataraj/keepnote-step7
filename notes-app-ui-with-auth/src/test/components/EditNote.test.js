import React from 'react';
import { mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import EditNote from '../../components/EditNote';
 
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

let notes, wrapper;

beforeEach(() => {
    const searchString = { params: { id: '1' } }

    notes = [
        {
            "noteTitle": "note-1",
            "noteDescription": "note-1 description",
            "id": 1
        }, {
            "noteTitle": "note-2",
            "noteDescription": "note-2 description",
            "id": 2
        }];

    wrapper = mount(
        <MemoryRouter>
            <EditNote
                notes={notes}
                match={searchString} />
        </MemoryRouter>
    );
})

test('test EditNote ', () => {
    expect(wrapper).toMatchSnapshot();
});