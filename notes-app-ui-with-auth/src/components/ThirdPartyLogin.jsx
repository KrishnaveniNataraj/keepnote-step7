import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import googleLogo from '../images/google-logo.png';
import { firebase, googleAuthProvider } from '../firebase/firebase';
import { history } from '../routers/AppRouter';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing.unit * 2.5,
    },
    googleLogo: {
        widht: 25,
        height: 25,
    }
});

class ThirdPartyLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: localStorage.getItem('isLoggedIn') || false,
          }
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }
    handleGoogleLogin() {
        return firebase.auth().signInWithPopup(googleAuthProvider)
            .then(() => {
                var user = firebase.auth().currentUser;
                if (user != null) {
                    localStorage.setItem('loggedInUser', user.email);
                }
                localStorage.setItem('isLoggedIn', true);
                this.props.handleLogin();
                history.push('/home');
            })
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="subtitle2" style={{ marginBottom: '2px' }} color="textPrimary">Sign in with</Typography>
                <IconButton onClick={this.handleGoogleLogin}>
                    <img className={classes.googleLogo} src={googleLogo} alt="Sign in with Google" />
                </IconButton>
            </div>
        );
    }
}

ThirdPartyLogin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ThirdPartyLogin);