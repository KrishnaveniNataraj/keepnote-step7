import React from 'react';
import { mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import NotesContainer from '../../components/NotesContainer';
 
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

let notes, handleRemoveNote, wrapper;

beforeEach(() => {
    handleRemoveNote = jest.fn();
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
            <NotesContainer
                notes={notes}
                handleRemoveNote={handleRemoveNote} />
        </MemoryRouter>
    );
})

test('test NotesContainer ', () => {
    expect(wrapper).toMatchSnapshot();
});