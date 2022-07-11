import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_ME_REVIEW, USER_QUERY } from '../../utils/queries';
import Auth from '../../utils/auth';
import { getSearchedBookIds } from '../../utils/localStorage';

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
 
 //maps the reviews so that the information all displays
  const profileIndivReviews = (reviews) => {
    return (
      <Box>
      {reviews.map((review, index) => {
        return (
          <Box>
          <Stack container direction='row' spacing={2} divider={<Divider orientation='vertical' flexItem />}>
          <Box item sx={gridStyles}>
              <Typography variant='h5'>
              {review.productTitle}
              </Typography>    
              <Typography variant='h6'>
              {review.reviewTitle} - {review.rating}/5 Stars!
              </Typography>
          </Box>
          {/*onClick={handleDelete}*/}
          <Button>Delete</Button>
      </Stack>
      <Stack>
          <Box item sx={gridStyles}>
              <Typography>
              {review.description}
              </Typography>
          </Box>
      </Stack>
      </Box>
        )
      })}
      </Box>
      
    )
  }

  export default profileIndivReviews;