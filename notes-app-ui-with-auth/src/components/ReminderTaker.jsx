import React, { Component, Fragment } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ColorPicker from 'react-color';
import ColorLensIcon from '@material-ui/icons/ColorLens';

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit * 2,
    },
    absolute: {
        position: 'absolute',
        borderRadius: 8,
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
    color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: 'black',
    },
    swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
    },
    popover: {
        position: 'fixed',
        zIndex: '2',
    },
});

class ReminderTaker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            reminderName: '',
            reminderDescription: '',
            reminderType: '',
            color: {
                r: '255',
                g: '255',
                b: '255',
                a: '1',
            },
            background: 'black',
            displayColorPicker: false,
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleAddReminder = this.handleAddReminder.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleReminderTitleChange = this.handleReminderTitleChange.bind(this);
        this.handleReminderDescriptionChange = this.handleReminderDescriptionChange.bind(this);
        this.handleColorClose = this.handleColorClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleReminderTypeChange = this.handleReminderTypeChange.bind(this);
    }

    handleClickOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({
            open: false,
            reminderName: '',
            reminderDescription: '',
            reminderType: '',
            color: {
                r: '255',
                g: '255',
                b: '255',
                a: '1',
            },
            background: 'black',
        });
    }

    handleReminderTitleChange(event) {
        this.setState({ reminderName: event.target.value });
    }

    handleReminderDescriptionChange(event) {
        this.setState({ reminderDescription: event.target.value });
    }

    handleReminderTypeChange(event) {
        this.setState({ reminderType: event.target.value });
    }

    handleAddReminder() {
        const newReminder = {
            reminderId: Math.random() * 2342342,
            reminderName: this.state.reminderName,
            reminderDescription: this.state.reminderDescription,
            color: this.state.color,
            reminderType: this.state.reminderType,
            reminderCreatedBy: localStorage.getItem('loggedInUser'),
        }
        this.props.handleAddReminder(newReminder);
        this.handleClose();
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleColorClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.setState({ color: color.rgb, background: color.hex })
    };

    render() {
        const { classes } = this.props;
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }
        return (
            <Fragment>
                <Tooltip title="Add Reminder" aria-label="Add Reminder">
                    <Fab
                        color="secondary"
                        className={classes.absolute}
                        onClick={this.handleClickOpen}
                    >
                        Remind +
                    </Fab>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="Add Reminder form"
                >
                    <DialogTitle id="Add Reminder form" align="end">
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        Add Reminder
                            <div style={styles.swatch} onClick={this.handleClick}>
                            <ColorLensIcon className={classes.iconHover} style={{ fontSize: 30 ,color: this.state.background}} />
                        </div>
                        {this.state.displayColorPicker ? <div className={classes.popover}>
                            <div style={cover} onClick={this.handleColorClose} />
                            <ColorPicker color={this.state.color}
                                onChangeComplete={this.handleChange} />
                        </div> : null}
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Reminder title"
                            label="Reminder Title"
                            type="text"
                            fullWidth
                            onChange={this.handleReminderTitleChange}
                            value={this.state.reminderName}
                        />
                        <TextField
                            margin="dense"
                            id="Reminder description"
                            label="Reminder Description"
                            type="text"
                            onChange={this.handleReminderDescriptionChange}
                            value={this.state.reminderDescription}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="Reminder Type"
                            label="Reminder Type"
                            type="text"
                            onChange={this.handleReminderTypeChange}
                            value={this.state.reminderType}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAddReminder} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment >
        );
    }
}

export default withStyles(styles)(ReminderTaker);
