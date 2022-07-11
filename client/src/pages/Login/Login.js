import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import LoginForm from '../../components/LoginForm';

import {
    CssBaseline,
    Box,
    Grid,
    Container,
    Stack,
  } from '@mui/material'

import { styled  } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';

import {gridSectionStyles, gridStyles, imageStyles, linkStyles} from './LoginStyles.js';
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

const Login = () => {


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
                <Box component="h1" sx={{}}>Login</Box>
                <Box>
                  <LoginForm/>
                  <Button href='/signup'
                  variant='text'>
                  Signup Here!
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

export default Login;