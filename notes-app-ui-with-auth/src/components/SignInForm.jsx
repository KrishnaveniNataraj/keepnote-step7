import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { history } from '../routers/AppRouter';
import { Grid } from '@material-ui/core';
//import { checkSignInErrorType } from '../utils/check-signin-error-type';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    textField: {
        width: '100%',
        fontSize: '4px',
        overflowWrap: 'break-word',
    },
    marginTop: {
        marginTop: theme.spacing.unit * 8,
    },
    signInButton: {
        marginTop: theme.spacing.unit * 2,
        alignSelf: 'flex-end',
    }
});

const USER_API_BASE_URL = 'http://localhost:9090/user-service/api/v1/user';

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessageInUsername: '',
            errorMessageInPassword: '',
        };
        this.handleSignIn = this.handleSignIn.bind(this);
    }
    handleChange(name) {
        return (event => {
            this.setState({
                errorMessageInUsername: '',
                errorMessageInPassword: '',
                [name]: event.target.value,
            });
        });
    }
    handleSignIn(event) {
        event.preventDefault();

        const newUser = {
            userId: this.state.email,
            userName: this.state.email,
            userPassword: this.state.password
        }

        fetch(`${USER_API_BASE_URL}/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            else if (response.status === 404) {
                return Promise.reject(new Error('Credentials Not Matched'))
            }
            else if (response.status === 401) {
                return Promise.reject(new Error('UnAuthorized User...'));
            }
            else {
                return Promise.reject(new Error('Some internal error occured...'));
            }
        }).then(user => {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('loggedInUser', this.state.email);
                this.props.handleLogin();
                history.push('/home');
            }).catch((error) => {
                //const errorCode = error.code;
                const errorMessage = error.message;
                //const errorType = checkSignInErrorType(errorCode);
                const errorType = 'email';
                if (errorType === 'email') {
                    this.setState({
                        errorMessageInUsername: errorMessage,
                    });
                } else if (errorType === 'password') {
                    this.setState({
                        errorMessageInPassword: errorMessage,
                    });
                } else {
                    this.setState({
                        errorMessageInUsername: errorMessage,
                        errorMessageInPassword: errorMessage,
                    })
                }
            })
    }
    render() {
        const { classes } = this.props;
        return (
            <>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <form className={classes.root} onSubmit={this.handleSignIn}>
                            <TextField
                                className={classes.textField}
                                required
                                autoFocus
                                error={this.state.errorMessageInUsername !== ''}
                                helperText={this.state.errorMessageInUsername ? this.state.errorMessageInUsername : ''}
                                type="email"
                                id="user-email"
                                label="Email"
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                margin="normal"
                            />
                            <TextField
                                className={classes.textField}
                                required
                                error={this.state.errorMessageInPassword !== ''}
                                helperText={this.state.errorMessageInPassword ? this.state.errorMessageInPassword : ''}
                                type="password"
                                id="user-password"
                                label="Password"
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                margin="normal"
                            />
                            <Button type="submit" color="primary" variant="outlined" className={classes.signInButton}>
                                SignIn
                            </Button>
                        </form>
                        <div className={classes.marginTop}></div>
                    </Grid>
                </Grid>
            </>
        );
    }
}

SignInForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignInForm);