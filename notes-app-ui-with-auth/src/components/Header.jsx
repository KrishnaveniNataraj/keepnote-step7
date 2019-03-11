import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import SearchBar from './SearchBar';
import { Button } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import { firebase } from '../firebase/firebase';

import { Link } from "react-router-dom";
//import MenuDropDown from './MenuDropDown';

const styles = theme => ({
  root: {
    width: '100%',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  grow: {
    flexGrow: 1
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleNoteCurrentPage = this.handleNoteCurrentPage.bind(this);
    this.handleRemCurrentPage = this.handleRemCurrentPage.bind(this);
    //this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  handleNoteCurrentPage() { this.props.handleCurrentPage('notes') }
  handleRemCurrentPage() { this.props.handleCurrentPage('rem') }

  // life cycle method to get the props for child component when parent component rerenders
  componentWillReceiveProps() {
    if (this.props.isLoggedIn && localStorage.getItem('isLoggedIn')) {
      this.setState({ isLoggedIn: true });
    }
  }

  // handleLogin() {
  //   return firebase.auth().signInWithPopup(googleAuthProvider).then(success => {
  //     var user = firebase.auth().currentUser;
  //     if (user != null) {
  //       localStorage.setItem('loggedInUser', user.email);
  //     }

  //     localStorage.setItem('isLoggedIn', true);
  //     this.setState({ isLoggedIn: true });
  //     this.props.handleLoadData();
  //   })
  // }

  handleLogin() {
    // dummy method. Login now happens in AuthenticationForm or ThirdPartyLogin components
  }

  handleLogout() {
    localStorage.removeItem('isLoggedIn', false);
    localStorage.removeItem('loggedInUser');
    this.setState({ isLoggedIn: false });
    return firebase.auth().signOut();
  }

 // handleDeleteUser() {}

  

  render() {
    const { classes, currentPage } = this.props;
    // Object destructruing -- if assignee and variable name is same then we can do below
    // instead of isLoggedIn = this.state.isLoggedIn -- as both we are using same name
    const { isLoggedIn } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <DescriptionIcon />
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Handy - Notes
            </Typography>
            {isLoggedIn ? <SearchBar filterNotes={this.props.filterNotes} /> : ''}
            <div className={classes.grow} />
            {isLoggedIn ? <div>
              
              <Button className={classes.button} onClick={currentPage === 'notes' ? this.handleRemCurrentPage : this.handleNoteCurrentPage}>
              {currentPage === 'notes' ? 'Reminders Here' : 'Notes Here'}
              </Button>
              </div> : ''}
            <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}><Button className={classes.button} onClick={isLoggedIn ? this.handleLogout : this.handleLogin}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button></Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);    // HOC -> Higher Order Component which takes another compoennt as an argument