import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { searchGoogleBooks } from '../../utils/API';
import { getSearchedBookIds, saveSelectBook } from '../../utils/localStorage';

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
import { experimental_extendTheme, styled  } from '@mui/material/styles';

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
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [productData, setProductData] = useState(getSearchedBookIds);
  const [submittedValue, setSubmittedValue] = React.useState(false);

  useEffect(() => {
  }, [productData]);

  const buildSearchResults = (results) => {
    return (
      <Stack spacing={1} sx={{m: 0, p: 3}}>
        <Box component="h3">Results</Box>
        <Stack spacing={4}>
          {results ? results.map((result, index) => {
            return(
              <Stack key={index} spacing={0.5} sx={resultsWrapStyles}>
                  <Grid sx={gridStyles} 
                    container
                    // alignItems="center"
                  >
                    <Grid item sx={gridStyles} xs={12} sm={4} md={3} onClick={() =>    saveSelectBook(result)}>
                      <LinkStyled to={'/product'} >
                        <Box component="img" sx={imageStyles}
                          src={result.image}
                          alt=''
                        />
                      </LinkStyled>
                    </Grid>
                    <Grid item sx={gridStyles} xs={12} sm={8} md={9} onClick={() => saveSelectBook(result)}>
                      <LinkStyled to={'/product'} >
                        <Box component="span" sx={{fontSize: 'x-large', fontWeight: 'bold'}}>{result.title}</Box>
                      </LinkStyled>
                      <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Rating name="half-rating-read" value={result.averageRating ? result.averageRating : 0} precision={0.5} readOnly />
                        <Box sx={{ ml: 1, alignItems: 'center' }}>{labels[result.rating]}</Box>
                      </Box>
                      <Box component="p">{result.description}</Box>
                    </Grid>
                  </Grid>
              </Stack>
              )
          }) : <Box>No results</Box>
        }
        </Stack>
      </Stack>
    )
  };

  const handleSearchFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }
    if (searchInput === 'quickreviews test') {
      navigate('/product');
      return false;
    }

    try {
      await searchGoogleBooks(searchInput);
      const resultsData = localStorage.getItem('resultsData')
      ? JSON.parse(localStorage.getItem('resultsData'))
      : [];

      console.log("resultsData submit:", resultsData)

      setProductData(resultsData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  }

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
                      '& .MuiTextField-root': { mt: 0.5, width: '60ch', maxWidth: '100%' },
                      '& .MuiButton-root': { width: '15ch', maxWidth: '100%' }
                    }}
                    onSubmit={handleSearchFormSubmit}
                    noValidate
                    autoComplete="off"
                  >
                    <Stack spacing={0}>
                      <TextField
                        label="Search for a book"
                        placeholder="Search for a book"                        
                        onChange={(event) => setSearchInput(event.target.value)}
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
                {buildSearchResults(productData)}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </ContainerStyled>
    </BoxBackground>
  );
}

export default Search;
