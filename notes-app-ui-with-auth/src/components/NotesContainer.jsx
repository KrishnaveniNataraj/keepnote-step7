import React from 'react';
import { Grid } from '@material-ui/core';
import Note from './Note';

const NotesContainer = (props) => (
    <Grid container spacing={8}>
        {
            ((props.notes.length > 0) ?
                (props.notes.map(note => {
                    return (
                        <Grid key={note.id} item xs={12} sm={4} xl={3}>
                            <Note note={note} handleRemoveNote={props.handleRemoveNote} reminders={props.reminders} />
                        </Grid>
                    );
                })) : (<div align='center'>
                            <h2 style={{ color: 'green' }}>
                                No Notes to show,add the notes !!!!...
                            </h2>
                        </div>))
        }
    </Grid>
);

export default NotesContainer;