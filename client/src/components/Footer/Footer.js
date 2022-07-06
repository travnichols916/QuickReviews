import React, { useState, useEffect } from 'react';
import { getMe } from '../../utils/API';
import Auth from '../../utils/auth';
import ProfileIndivReview from '../../components/ProfileIndividualReviews/ProfileIndividualReviews';

import {
    CssBaseline,
    Box,
    Grid,
    Container,
    Rating,
    Stack,
    Tab,
    Typography,
    Divider,
    Button
  } from '@mui/material'

import { styled  } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';

import {gridSectionStyles, gridStyles, imageStyles, linkStyles} from './ProfileStyles';

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

const Footer = () => {

    return (
        <>
        </>
    )
}

export default Footer;