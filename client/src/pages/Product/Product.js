import React, { useState, useEffect } from 'react';

import {
  CssBaseline,
  Box,
  Grid,
  Container,
  Rating,
  Stack,
  Tab,
} from '@mui/material'

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import StarIcon from '@mui/icons-material/Star';
import { styled  } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';

import Auth from '../../utils/auth';

import {gridSectionStyles, gridStyles, imageStyles} from './ProductStyles.js';

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

const labels = {
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

const Product = () => {
  const [userData, setUserData] = useState({});
  const [userReview, setUserReview] = useState({});
  const [productData, setProductData] = useState({});
  const [tabReviewValue, setTabReviewValue] = React.useState('1');

  const handleTabReviewChange = (event, newValue) => {
    setTabReviewValue(newValue);
  };

  const [reviewerValue, setReviewerValue] = React.useState(2);
  const [reviewerHover, setReviewerHover] = React.useState(-1);

  useEffect(() => {
  }, [productData])

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
            <Box component="h2" sx={{}}>Name of Product</Box>
            <Grid item sx={gridStyles} xs={12} 
              container
              justifyContent="center"
              alignItems="center"
            >
              <Grid item sx={gridStyles} xs={12} md={5}>
                <Box component="img" sx={imageStyles}
                  src='https://via.placeholder.com/1200x700'
                  alt=''
                />
              </Grid>
              <Grid item sx={gridStyles} xs={12} md={7}>
                <Stack spacing={1}>
                  <Box component="h3">Product description
                  </Box>
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} size="large" readOnly />
                    {reviewerValue !== null && (
                        <Box sx={{ ml: 2, alignItems: 'center' }}>{labels[reviewerValue]}</Box>
                      )}
                  </Box>
                  <Box component="p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </Box>
                </Stack>
              </Grid>
            </Grid>
            <Grid item sx={gridStyles} xs={12} 
              container
              justifyContent="center"
              alignItems="center"
            >
              <Grid item sx={gridStyles} xs={12} md={8} lg={8}>
                <Box component="h2" sx={{textAlign: 'center'}}>Reviews</Box>
              </Grid>
              <Grid item sx={gridStyles} xs={12} >
               
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={tabReviewValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleTabReviewChange} aria-label="lab API tabs example">
                        <Tab label="Reviews" value="1" />
                        <Tab label="Write a Review" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <Stack spacing={1}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                          <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
                          {reviewerValue !== null && (
                              <Box sx={{ ml: 2, alignItems: 'center' }}>{labels[reviewerValue]}</Box>
                            )}
                        </Box>
                        <Box component="p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Box>
                      </Stack>
                    </TabPanel>
                    <TabPanel value="2">
                      <Stack spacing={1}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                          <Rating name="half-rating" defaultValue={2.5} precision={0.5} 
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                              setReviewerValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                              setReviewerHover(newHover);
                            }}
                            // emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                          />
                          {reviewerValue !== null && (
                            <Box sx={{ ml: 2, mb: '0.5rem', alignItems: 'center' }}>{labels[reviewerHover !== -1 ? reviewerHover : reviewerValue]}</Box>
                          )}
                        </Box>
                      </Stack>
                    </TabPanel>
                  </TabContext>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ContainerStyled>
    </BoxBackground>
  );
}

export default Product;
