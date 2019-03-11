import { createMuiTheme } from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';
import merun from '@material-ui/core/colors/pink';

const theme = createMuiTheme({
    palette: {
        primary: lightGreen,
        secondary: merun,
    },
    typography: {
        useNextVariants: true,
    },
});

export default theme;