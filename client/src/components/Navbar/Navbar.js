import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import { saveBook, searchGoogleBooks } from '../../utils/API';
import { saveBookIds, getSavedBookIds } from '../../utils/localStorage';

import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled  } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import { Drawer} from '@mui/material/Drawer';
import Accordion from '@mui/material/Accordion';
import {gridSectionStyles, gridStyles, imageStyles, linkStyles, navBarBGStyles} from './NavbarStyles.js';
import { TextField } from '@mui/material';

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

const AppNavbar = () => {
    // set modal display state
    const [showModal, setShowModal] = useState(false);

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"
      sx={navBarBGStyles}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href='/'
            sx={linkStyles}>
              QuickReviews
            </Link>
          </Typography>

          <FormControl>
            <TextField variant='standard'
            name='searchInput'
            placeholder='Search for a book'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}></TextField>
          </FormControl>
          <Button
            type='submit'
            variant='success' 
            size='sm'
          >Search</Button>


{/* Login/Signup Buttons or ViewProfile/Logout Buttons*/}
      {Auth.loggedIn() ? (
        <>
          <Button>
            <Link href='/login' sx={linkStyles}>
              View Profile
            </Link>
          </Button>
          <Button onClick={Auth.logout}>
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
      )}


        </Toolbar>
      </AppBar>
    </Box>

      </>
    );
  };
  
  export default AppNavbar;
  