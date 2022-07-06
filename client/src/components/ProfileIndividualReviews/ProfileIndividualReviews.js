import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import { saveBook, searchGoogleBooks } from '../../utils/API';
import { saveBookIds, getSavedBookIds } from '../../utils/localStorage';

import {
    Container,
    Link,
    Box,
    Button,
    Stack,
    Divider,
    Typography
  } from '@mui/material'
  
  import { styled  } from '@mui/material/styles';
  import { lightBlue } from '@mui/material/colors';
  
  import {gridSectionStyles, gridStyles, imageStyles, linkStyles, } from './ProfileIndividualReviewsStyles.js';
  
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

  const ProfileIndivReview = () => {


    return (
        <>
        <Box>
            <Stack container direction='row' spacing={2} divider={<Divider orientation='vertical' flexItem />}>
                <Box item>
                    <Typography variant='h6'>
                    Title of Book
                    </Typography>    
                    <Typography variant='h6'>
                    Title of Review
                    </Typography>
                </Box>
                <Button item>Delete</Button>
            </Stack>
            <Stack>
                <Box>
                    <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                </Box>
            </Stack>
        </Box>
        </>
    )
  }

  export default ProfileIndivReview;