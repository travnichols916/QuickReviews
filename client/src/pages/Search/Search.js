import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import {
  CssBaseline,
  Box,
  Grid,
  Container,
  Rating,
  Stack,
  TextField,
  Button
} from '@mui/material'

// import StarIcon from '@mui/icons-material/Star';
import { styled  } from '@mui/material/styles';

import Auth from '../../utils/auth';

import {gridSectionStyles, gridStyles, imageStyles, resultsWrapStyles} from './SearchStyles.js';

const BoxBackground = styled(Box)(({ theme }) => ({
  paddingTop: '2rem',
  paddingBottom: '3rem',
  background: 'rgb(240, 240, 255)'
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  color: 'unset',
  "&:hover": {
    color: 'unset',
  }
}));

const ContainerStyled = styled(Container)(({ theme }) => ({
}));

const labels = {
  0: 'Strong Dislike',
  0.5: 'Strong Dislike',
  1: 'Strong Dislike',
  1.5: 'Dislike',
  2: 'Dislike',
  2.5: 'Below Average',
  3: 'Average',
  3.5: 'Above Average',
  4: 'Above Average',
  4.5: 'Excellent',
  5: 'Amazing',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const Search = () => {
  const [userData, setUserData] = useState({});
  const [userReview, setUserReview] = useState({});
  const [productData, setProductData] = useState({});
  const [titleValue, setTitleValue] = React.useState('');
  // const [commentValue, setCommentValue] = React.useState('');
  const [submittedValue, setSubmittedValue] = React.useState(false);

  const [dataReviews, setDataReviews] = React.useState([
    {
      rating: 1,
      title: "Poke MissingNo.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      rating: 4,
      title: "Mouse Interests",
      description: "Learn all about the interest of mice."
    },
    {
      rating: 2,
      title: "Introduction to Cheese",
      description: "Flavorful book of cheese."
    },
    {
      rating: 4.5,
      title: "Fascinating Geos.",
      description: "Rocks of all kinds."
    }
  ]);

  const buildSearchResults = (results) => {
    return (
      <Stack spacing={1} sx={{m: 0, p: 3}}>
        <Box component="h3">Results</Box>
        <Stack spacing={4}>
          {results.map((result, index) => {
            return(
              <Stack key={index} spacing={0.5} sx={resultsWrapStyles}>
                  <Grid sx={gridStyles} 
                    container
                    // alignItems="center"
                  >
                    <Grid item sx={gridStyles} xs={12} sm={4} md={3} >
                      <LinkStyled to={'/product'}>
                        <Box component="img" sx={imageStyles}
                          src='https://via.placeholder.com/700x700'
                          alt=''
                        />
                      </LinkStyled>
                    </Grid>
                    <Grid item sx={gridStyles} xs={12} sm={8} md={9}>
                      <LinkStyled to={'/product'}>
                        <Box component="span" sx={{fontSize: 'x-large', fontWeight: 'bold'}}>{result.title}</Box>
                      </LinkStyled>
                      <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Rating name="half-rating-read" value={result.rating} precision={0.5} readOnly />
                        <Box sx={{ ml: 1, alignItems: 'center' }}>{labels[result.rating]}</Box>
                      </Box>
                      <Box component="p">{result.description}</Box>
                    </Grid>
                  </Grid>
              </Stack>
              )
          })}
        </Stack>
      </Stack>
    )
  };

  const handleReviewFormSubmit = (event) => {
    event.preventDefault();
    console.log("Submit button titleValue: ", titleValue);
    // console.log("Submit button commentValue: ", commentValue)
  }

  // useEffect(() => {
  // }, [productData])

  return (
    <BoxBackground>
      <CssBaseline />
      <ContainerStyled maxWidth="lg" >
        <Grid
          container 
          spacing={0}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item sx={gridSectionStyles} xs={12}
            container
            alignItems="center"
          >
            <Box component="h2" sx={{m: 2, p: 2}}>Product Search</Box>
            <Grid item sx={{...gridStyles, p: 3}} xs={12} 
              container
              justifyContent="center"
              alignItems="center"
            >
              <Grid item sx={gridStyles} xs={12} md={9}>
                <Stack spacing={1}>
                  {/* <Box component="h3">Search</Box> */}
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { mt: 0.5, width: '60ch' },
                      '& .MuiButton-root': { width: '15ch' }
                    }}
                    onSubmit={handleReviewFormSubmit}
                    noValidate
                    autoComplete="off"
                  >
                    <Stack spacing={0}>
                      <TextField
                        label="Search for a book"
                        placeholder="Search for a book"                        
                        onChange={(event) => setTitleValue(event.target.value)}
                      />
                      <Button sx={{mt: 0.5}} variant="contained" type="submit">Search</Button>
                      {submittedValue === true && (<Box component="span">Submitted</Box>)}
                    </Stack>
                  </Box>
                </Stack>
              </Grid>
              <Grid item sx={gridStyles} xs={6} md={3}>
                <Box component="img" sx={imageStyles}
                  src='https://via.placeholder.com/700x700'
                  alt=''
                />
              </Grid>
            </Grid>
            <Grid item sx={gridStyles} xs={12} 
              container
              justifyContent="center"
              alignItems="center"
            >
              <Box sx={{ width: '100%', typography: 'body1' }}>
                {buildSearchResults(dataReviews)}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </ContainerStyled>
    </BoxBackground>
  );
}

export default Search;
