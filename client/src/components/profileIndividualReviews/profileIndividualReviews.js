import React from 'react';

import {
    Box,
    Container,
    Stack,
    Typography,
    Divider,
    Button
  } from '@mui/material'

import { styled  } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';
import { gridStyles } from './ProfileStyles';

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
              {review.reviewText}
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