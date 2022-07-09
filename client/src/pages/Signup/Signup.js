import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import SignUpForm from '../../components/SignupForm';

import {
    CssBaseline,
    Box,
    Grid,
    Container,
    Stack,
  } from '@mui/material'

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import StarIcon from '@mui/icons-material/Star';
import { styled  } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';

import {gridSectionStyles, gridStyles, imageStyles, linkStyles} from './SignupStyles.js';
import { Button } from 'react-bootstrap';

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

const Signup = () => {


    return (
        <>
        <BoxBackground> <CssBaseline />
          <ContainerStyled maxWidth='lg'>
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
                <Stack>
                <Box component="h1" sx={{}}>Signup</Box>
                <Box>
                  <SignUpForm/>
                    <Button href='/login'
                    variant='text'>
                    Already have an Account?
                    </Button>
                </Box>


                  
                </Stack>
            </Grid>
            </Grid>
          </ContainerStyled>
        </BoxBackground>
        </>
    )
 }

 export default Signup