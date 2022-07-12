import React, { useState, useEffect } from 'react';

import {
  CssBaseline,
  Box,
  Grid,
  Container,
  Stack,
} from '@mui/material'

import { styled  } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';

import Auth from '../../utils/auth';

import {gridSectionStyles, gridStyles, imageStyles} from './HomeStyles.js';

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

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(0.5),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const Home = () => {
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
            justifyContent="center"
            alignItems="center"
          >
            <Box component="img" sx={imageStyles}
              src='https://via.placeholder.com/1200x700'
              alt=''
            />
            <Box component="h2" sx={{position: 'absolute'}}>Quick Reviews</Box>
          </Grid>
          <Grid item sx={gridSectionStyles} xs={12} 
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item sx={gridStyles} xs={12}>
              <Stack sx={{
                display: 'flex',
                justifyContent:"center",
                alignItems:"center"}}
              >
                <Grid item sx={gridStyles} xs={12} md={8} lg={8}>
                  <Box component="h2" sx={{textAlign: 'center'}}>About</Box>
                </Grid>
                <Grid item sx={gridStyles} xs={12} >
                  <Box component="p">Our mission is to provide as many honest reviews as possible. Many websites who own products attempts to hide negative reviews. So we want to build trust with our community by keeping every review.
                  </Box>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </ContainerStyled>
    </BoxBackground>
  );
}

export default Home;
