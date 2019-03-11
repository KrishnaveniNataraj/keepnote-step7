import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { lightGreen, merun } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: lightGreen,
        secondary: merun
    },
    typography: {
        useNextVariants: true,
    },
});

// function to handle routes which are protected,
// Component is difened to handle such components to be rendered, which takes rest {...rest} of the properties sent and all other props
// this passes all the props which we are sendiong in the ProtectedRoute tag which loads the actual component
function ProtectedRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                (localStorage.getItem('isLoggedIn') || false) ? (
                    <MuiThemeProvider theme={theme}>
                        <Component
                            {...rest}
                            {...props}
                        />
                    </MuiThemeProvider >
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}

export default ProtectedRoute;