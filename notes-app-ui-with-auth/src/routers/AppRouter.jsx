import React, { Component, Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import NotesApp from '../components/NotesApp';
import EditNote from '../components/EditNote';
import createHistory from 'history/createBrowserHistory';
import WelcomePage from '../components/WelcomePage';
import { lightGreen, merun } from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Header from '../components/Header';
import AuthenticationForm from '../components/AuthenticationForm';
import ProtectedRoute from './ProtectedRoute';

const theme = createMuiTheme({
    palette: {
        primary: lightGreen,
        secondary: merun
    },
    typography: {
        useNextVariants: true,
    },
});

export const history = createHistory();

const NOTE_API_BASE_URL = 'http://localhost:9091/note-service/api/v1/note';
const REMINDER_API_BASE_URL = 'http://localhost:9093/reminder-service/api/v1/reminder';

class AppRouter extends Component {
    // filteredNotes is used to show the matching notes during search
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            filteredNotes: [],
            isLoggedIn :false,
            reminders : [],
            currentPage: 'notes',
        };
        this.handleLoadData = this.handleLoadData.bind(this);        
        this.handleAddNote = this.handleAddNote.bind(this);
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
        this.handleUpdateNote = this.handleUpdateNote.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.handleCurrentPage = this.handleCurrentPage.bind(this);
        this.handleAddReminder = this.handleAddReminder.bind(this);
        this.handleRemoveReminder = this.handleRemoveReminder.bind(this);
    }

    handleLogin(){
        this.setState(currState => ({
            isLoggedIn: true,
            currentPage: 'notes'
        }));
        this.handleLoadData();
    }

    // react life cycle method called once when the page is getting loaded
    componentDidMount() {
        // Get all the notes      
        if(localStorage.getItem('isLoggedIn')) {
            this.handleLoadData(); 
        }       
    }

    handleLoadData() {
        this.getAllNotes();
        this.getAllReminders();
    }

    getAllNotes() {
        // Get all the notes
        let loggedInUser = localStorage.getItem('loggedInUser');
        fetch(`${NOTE_API_BASE_URL}/${loggedInUser}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else if (response.status === 404) {
                    return Promise.reject(new Error('Invalid URL'))
                }
                else if (response.status === 401) {
                    return Promise.reject(new Error('UnAuthorized User...'));
                }
                else {
                    return Promise.reject(new Error('Some internal error occured...'));
                }
            })
            .then(userNotes => this.setState({
                notes: userNotes,
                filteredNotes: userNotes
            })).catch(error => {
                console.log("Note Service - getAllNotes Exception");
            })
    }   

    handleAddNote(note) {
        fetch(`${NOTE_API_BASE_URL}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(note)
        }).then(response => response.json())
            .then(note => {
                this.setState((currState) => ({
                    notes: currState.notes.concat([note]),
                    filteredNotes: currState.notes.concat(note)
                }));
            }).catch(error => {
                console.log("Note Service - handleAddNote Exception");
            })
    }

    handleRemoveNote(noteId) {
        let loggedInUser = localStorage.getItem('loggedInUser');
        fetch(`${NOTE_API_BASE_URL}/${loggedInUser}/${noteId}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        }).then(response => {
            const noteIndexToRemove = this.state.notes.findIndex(note => note.id === noteId);
            this.setState((currState) => ({
                notes: [...currState.notes.slice(0, noteIndexToRemove), ...currState.notes.slice(noteIndexToRemove + 1)],
                filteredNotes: [...currState.notes.slice(0, noteIndexToRemove), ...currState.notes.slice(noteIndexToRemove + 1)]
            }));
        }).catch(error => {
            console.log("Note Service - handleRemoveNote Exception");
        })
    }

    // ...updateNote ... is spread operator which eventually passes the value in the object / variable used along with it.
    handleUpdateNote(updatedNote) {
        let loggedInUser = localStorage.getItem('loggedInUser');
        fetch(`${NOTE_API_BASE_URL}/${loggedInUser}/${updatedNote.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedNote)
        }).then(response => response.json())
            .then(note => {
                const noteIndexToUpdate = this.state.notes.findIndex(note => note.id === updatedNote.id);
                this.setState((currState) => ({
                    notes: [...currState.notes.slice(0, noteIndexToUpdate), { ...updatedNote }, ...currState.notes.slice(noteIndexToUpdate + 1)],
                    filteredNotes: [...currState.notes.slice(0, noteIndexToUpdate), { ...updatedNote }, ...currState.notes.slice(noteIndexToUpdate + 1)]
                }));
            }).catch(error => {
                console.log("Note Service - handleUpdateNote Exception");
            })
    }

    // Filter based on Search string
    filterNotes = (searchFilter) => {
        const searchString = searchFilter.target.value
        if (searchString) {
            let filteredNotes = this.state.notes.filter(filterNote => filterNote.noteTitle.toLowerCase().indexOf(searchString.toLowerCase()) > -1)
            // set the filetered notes matching given string to the state to show in Notes Container
            this.setState({
                filteredNotes
            })
        } else {
            this.setState(currState => ({
                filteredNotes: currState.notes
            }));
        }
    }

    // Login for Reminder Service calls - START
    handleCurrentPage(currentPage){
        this.setState((currState) => ({
            currentPage: currentPage,
        }));
    }

    getAllReminders() {
        // Get all the Reminders
        let loggedInUser = localStorage.getItem('loggedInUser');
        fetch(`${REMINDER_API_BASE_URL}/${loggedInUser}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else if (response.status === 404) {
                    return Promise.reject(new Error('Invalid URL'))
                }
                else if (response.status === 401) {
                    return Promise.reject(new Error('UnAuthorized User...'));
                }
                else {
                    return Promise.reject(new Error('Some internal error occured...'));
                }
            })
            .then(reminders => this.setState({
                reminders: reminders,
            })).catch(error => {
                console.log("Reminder Service - getAllReminders Exception");
            })
    } 

    handleAddReminder(reminder) {
        fetch(`${REMINDER_API_BASE_URL}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reminder)
        }).then(response => response.json())
          .then(reminder => {
            this.setState((currState) => ({
                reminders: currState.reminders.concat([reminder]),
            }));                
            });
    }

    handleRemoveReminder(reminderId) {
        let loggedInUser = localStorage.getItem('loggedInUser');
        fetch(`${REMINDER_API_BASE_URL}/${loggedInUser}/${reminderId}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
          //  .then(response => response.json())
            .then(response => {
                const reminderIndexToRemove = this.state.reminders.findIndex(reminder => reminder.reminderId === reminderId);
                this.setState((currState) => ({
                    reminders: [...currState.reminders.slice(0, reminderIndexToRemove), ...currState.reminders.slice(reminderIndexToRemove + 1)]
                }));
            });
    }
    
    // Login for Reminder Service calls - END

    render() {
        return (
            <Fragment>                
                <Router history={history}> 
                <div>
                <MuiThemeProvider theme={theme}>
                    <Header 
                        filterNotes={this.filterNotes}                        
                        isLoggedIn={this.state.isLoggedIn}
                        handleCurrentPage={this.handleCurrentPage} 
                        currentPage={this.state.currentPage} />
                </MuiThemeProvider>                                          
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={() => <MuiThemeProvider theme={theme}>
                                <WelcomePage />
                            </MuiThemeProvider>}
                        />
                         <Route
                            path="/login"
                            exact
                            render={() => <MuiThemeProvider theme={theme}>
                                <AuthenticationForm  handleLogin={this.handleLogin}/>
                            </MuiThemeProvider>}
                        />
                        <ProtectedRoute
                            path="/home"
                            exact
                            component={NotesApp}
                            notes={this.state.filteredNotes}
                            handleAddNote={this.handleAddNote}
                            handleRemoveNote={this.handleRemoveNote}
                            currentPage={this.state.currentPage}
                            reminders={this.state.reminders}
                            handleAddReminder = {this.handleAddReminder}
                            handleRemoveReminder = {this.handleRemoveReminder}                            
                        />
                        <ProtectedRoute
                            path="/edit-note/:id"
                            component={EditNote}
                            reminders={this.state.reminders}
                            notes={this.state.filteredNotes}
                            handleUpdateNote={this.handleUpdateNote}
                        />
                    </Switch>
                    </div>  
                </Router>
            </Fragment>
        );
    }
}

export default AppRouter;