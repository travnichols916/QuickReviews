import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';

import {
  Container,
  Link,
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  FormControl,
  Drawer,
  Grid,
  Icon,
  Stack,
  SvgIcon,
  List,
  Switch,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Accordion,
  TextField,
  Typography,
  Collapse,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import { styled  } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import {gridSectionStyles, gridStyles, imageStyles, linkStyles, navBarBGStyles} from './NavbarStyles.js';
import { borderBottom, textAlign } from '@mui/system';
import { useQuery } from '@apollo/client';
import { SEARCH_PRODUCTS } from '../../utils/queries';

const BoxBackground = styled(Box)(({ theme }) => ({
  paddingTop: '2rem',
  paddingBottom: '3rem',
  background: 'rgb(240, 240, 255)'
}));

const ContainerStyled = styled(Container)(({ theme }) => ({
  status: {
    background: lightBlue,
  },
}));

// The Collapsing Left Side of the Navbar FXN
const CollapseFunction = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  if (matches === true) {
    return  Auth.loggedIn() ? (
      <>
        <Button>
          <Link href='/profile' sx={linkStyles}>
            View Profile
          </Link>
        </Button>
        <Button onClick={Auth.logout} sx={linkStyles}>
            Logout
        </Button>        
      </>
    ) : (
      <>
        <Button>
          <Link href='/login'
          sx={linkStyles}
          >Login</Link>
        </Button>
        <Button>
          <Link href='/signup'
          sx={linkStyles}
          >Signup</Link>
        </Button>
      </>
      )
  }
  else {
    return Auth.loggedIn() ? (
      <>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} icon={<DensitySmallIcon />} checkedIcon={<DensitySmallIcon />}/>}
        />

        <Collapse in={checked}>
        <Button>
          <Link href='/profile' sx={linkStyles}>
            View Profile
          </Link>
        </Button>
        <Button onClick={Auth.logout} sx={linkStyles}>
            Logout
        </Button>
        </Collapse>        
      </>
    ) : (
      <>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} icon={<DensitySmallIcon />} checkedIcon={<DensitySmallIcon />}/>}
        />

        <Collapse in={checked}>
        <Button>
          <Link href='/login'
          sx={linkStyles}
          >Login</Link>
        </Button>
        <Button>
          <Link href='/signup'
          sx={linkStyles}
          >Signup</Link>
        </Button>
        </Collapse>
      </>
      )
  }
}

// Thumbnail, which changes between QuickReviews and QR
const Thumbnail = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  if (matches === true) {
    return  <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'center', }}>
              <Link href='/'
              sx={linkStyles}
              >
                Quick Reviews
              </Link>
            </Typography>
  }
  else {
    return  <Typography variant="h3" component="div" sx={{ flexGrow: 1, textAlign: 'center', textDecoration: 'unset' }}>
              <Link href='/'
              sx={linkStyles}
              >
                QR
              </Link>
            </Typography>
  }
}

const theme = createTheme();

// The NavBar itself
const AppNavbar = () => {
  const [formState, setFormState] = useState({ title: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const book = formState.title;
    const bookTitle = book.replace(' ', '%20');
    const requestUrl = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}`

    try {
      console.log(book)
      fetch(requestUrl)
        .then(function(response) {
          return response.json()
        })
        .then(function(data) {
          console.log(data)
          console.log(data.items.length)
          return data;
        })
    } catch (e) {
      console.error(e);
    }

    setFormState({
      title: ''
    });
  }
  
    return (
      <>
    <Grid sx={{ 
      flexGrow: 1,
      }}>
      <AppBar position="static"
      sx={navBarBGStyles}>
        <Grid
        container
        columns={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
        >
        <Grid
        item
        xs={3} sm={2}
        justifyItems='center'
        >
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'center', }}>
            <Link href='/'
            sx={linkStyles}>
              <ThemeProvider theme={theme}>
                <Thumbnail />
              </ThemeProvider>
            </Link>
          </Typography>
        </Grid>
          
        <Grid
        item
        xs={6} sm={3}
        >
          <form
          onSubmit={(e) => handleFormSubmit(e)}>
            <TextField variant='standard'
            id='title'
            name='title'
            placeholder='Search for a book'
            value={formState.title}
            onChange={(e) => handleChange(e)}></TextField>
          
          <Button
            type='submit'
            variant='success' 
            size='sm'
            sx={{
              marginLeft: '0px',
              padding: '3.5px',
            }}
            id='titleBtn'
          >Search</Button>

          </form>
        </Grid>
          


        <Grid
        item
        xs={3} sm={3}>
          {/* Login/Signup Buttons or ViewProfile/Logout Buttons*/}
          <Grid
          container
          direction='horizontal'>

            <ThemeProvider theme={theme}>
              <CollapseFunction />
            </ThemeProvider>

          </Grid>
        </Grid>


        </Grid>
      </AppBar>
    </Grid>

      </>
    );
  };
  
  export default AppNavbar;
  