import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { history } from '../routers/AppRouter';
import { Grid } from '@material-ui/core';
//import { checkSignUpErrorType } from '../utils/check-signup-error-type';

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
    signUpButton: {
        marginTop: theme.spacing.unit * 2,
        alignSelf: 'flex-end',
    }
});

const USER_API_BASE_URL = 'http://localhost:9090/user-service/api/v1/user';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessageInUsername: '',
            errorMessageInPassword: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
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
    handleSignUp(event) {
        event.preventDefault();

        const newUser = {
            userId: this.state.email,
            userName: this.state.email,
            userPassword: this.state.password
        }

        fetch(`${USER_API_BASE_URL}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        }).then(response => response.json())
            .then(user => {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('loggedInUser', this.state.email);
                this.props.handleLogin();
                history.push('/home');
            }).catch((error) => {
                //const errorCode = error.code;
                //const errorType = checkSignUpErrorType(errorCode);
                const errorType = 'email';
                const errorMessage = error.message;
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
                console.log("User Service - handleSignUp Exception");
            });           
    }
    render() {
        const { classes } = this.props;
        return (
            <>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <form className={classes.root} onSubmit={this.handleSignUp}>
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
                            <Button type="submit" color="primary" variant="outlined" className={classes.signUpButton}>
                                SignUp
                            </Button>
                        </form>
                        <div className={classes.marginTop}></div>
                    </Grid>
                </Grid>
            </>
        );
    }
}

SignUpForm.propTypes = {
    classes: PropTypes.object.isRequired,    
};

export default withStyles(styles)(SignUpForm);