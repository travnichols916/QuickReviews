import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import { saveBook, searchGoogleBooks } from '../../utils/API';
import { saveBookIds, getSavedBookIds } from '../../utils/localStorage';

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
    // create state for holding returned google api data
    const [searchedBooks, setSearchedBooks] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');
    // create state to hold saved bookId values
    const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

    useEffect(() => {
        return () => saveBookIds(savedBookIds);
    });

    // create method to search for books and set state on form submit
    const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
    };

    // create function to handle saving a book to our database
    const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveBook(bookToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
    };
  
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
          <FormControl>
            <TextField variant='standard'
            id='searchInput'
            placeholder='Search for a book'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}></TextField>
          </FormControl>
          <Button
            type='submit'
            variant='success' 
            size='sm'
            sx={{
              marginLeft: '0px',
              padding: '3.5px',
            }}
            id='searchInputBtn'
          >Search</Button>
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
  