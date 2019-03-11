import React, { Component } from 'react';
import { Card, CardHeader, CardContent, CardActions, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    deleteIcon: {
        justifyContent: 'flex-end',
    }
});

class Reminder extends Component {
    render() {
        const { classes, handleRemoveReminder, reminder } = this.props;
        return (
            <Card style={{background: `rgba(${ reminder.color.r }, ${ reminder.color.g }, ${ reminder.color.b }, ${ reminder.color.a })`}} >
                <CardHeader
                    title={reminder.reminderName}                   
                />
                <CardContent>
                    {reminder.reminderDescription}
                </CardContent>
                <CardContent>
                    {reminder.reminderType}
                </CardContent>
                <CardActions className={classes.deleteIcon}>
                    <IconButton onClick={handleRemoveReminder.bind(null, reminder.reminderId)}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(Reminder);