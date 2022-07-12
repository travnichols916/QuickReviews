import React, { useState, useEffect, useMemo  } from 'react';

import {
  CssBaseline,
  Box,
  Grid,
  Container,
  Rating,
  Stack,
  Tab,
  TextField,
  Button
} from '@mui/material'

import { 
  TabContext,
  TabList,
  TabPanel 
} from '@mui/lab';
// import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { styled  } from '@mui/material/styles';
import { getSelectBook } from '../../utils/localStorage';

import { useMutation, useQuery } from '@apollo/client';
import { REVIEW_BY_ISBN } from '../../utils/queries';
import { ADD_REVIEW } from '../../utils/mutation';
import Auth from '../../utils/auth';

import {gridSectionStyles, gridStyles, imageStyles, reviewWrapStyles, reviewRecStyles} from './ProductStyles.js';

const BoxBackground = styled(Box)(({ theme }) => ({
  paddingTop: '2rem',
  paddingBottom: '3rem',
  background: 'rgb(240, 240, 255)'
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
  4: 'Very Good',
  4.5: 'Excellent',
  5: 'Amazing',
};
const recommendedLabels = {
  0: 'Not Recommended',
  1: 'Recommended',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const Product = () => {
  const [userData, setUserData] = useState({});
  const [userReview, setUserReview] = useState({});
  const [tabReviewValue, setTabReviewValue] = React.useState('1');
  const [reviewerStarValue, setReviewerStarValue] = React.useState(0.5);
  const [reviewerStarHover, setReviewerStarHover] = React.useState(-1);
  const [reviewerRecValue, setReviewerRecValue] = React.useState(0);
  const [reviewerRecHover, setReviewerRecHover] = React.useState(-1);
  const [titleValue, setTitleValue] = React.useState('');
  const [commentValue, setCommentValue] = React.useState('');
  const [submittedValue, setSubmittedValue] = React.useState(false);
  const [productData, setProductData] = useState(getSelectBook);

  const [dataReviews, setDataReviews] = React.useState([])

  const { loading, data } = useQuery(REVIEW_BY_ISBN, {
    variables: { productIsbn: productData.isbn }
  });
  const isbnData = useMemo(() => data?.reviewsByIsbn || [], [data])
  const isbnDataLength = Object.keys(isbnData).length;

  useEffect(() => {
    if(isbnDataLength >= 1){
      setDataReviews(isbnData);
      }
  }, [isbnData, isbnDataLength]);

  const [ addReview, { error }] = useMutation(ADD_REVIEW);

  const handleTabReviewChange = (event, newValue) => {
    event.preventDefault();
    setTabReviewValue(newValue);
  };

  const buildReviews = (reviews) => {
    return (
      <Stack spacing={1} sx={{m: 0}}>
        <Box component="h3">Reviews</Box>
        <Stack spacing={4}>
          {(reviews !== undefined && reviews.length > 0) && reviews.map((review, index) => {
            return(
              <Stack key={index} spacing={0.5} sx={reviewWrapStyles}>
                <Box component="span">{review.username}</Box>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Rating name="half-rating-read" value={review.rating ? review.rating : 0} precision={0.5} readOnly />
                  <Box component="span" sx={{ml: 1, fontWeight: 'bold'}}>{review.reviewTitle}</Box>
                </Box>
                <Box component="p">{review.reviewText}</Box>
                { review.recommended ? 
                  <Box>
                    <ThumbUpIcon fontSize="small" /><Box component="span" sx={reviewRecStyles}>Recommended</Box>
                  </Box> : 
                  <Box>
                    <ThumbDownIcon fontSize="small" /><Box component="span" sx={reviewRecStyles}>Not Recommended</Box>
                  </Box>}
              </Stack>
              )
          })}
          {(reviews.length <= 0) && (
            <Stack spacing={0.5} sx={reviewWrapStyles}>
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Box component="span" sx={{ml: 1, p:3, fontSize: 24, fontWeight: 'bold'}}>No Reviews. Be the first to review this item!</Box>
              </Box>
            </Stack>
          )}
        </Stack>
      </Stack>
    )
  };

  const handleReviewFormSubmit = async (event) => {
    event.preventDefault();

    const recommended = (reviewerRecValue === 1)

    const reviewToSave = {
      productIsbn: productData.isbn,
      productTitle: productData.title,
      reviewTitle: titleValue,
      reviewText: commentValue,
      rating: reviewerStarValue,
      recommended: recommended,
    }
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await addReview({
        variables: reviewToSave
      })

      setSubmittedValue(true);
    } catch (err) {
      console.error(err);
    }
  }

  const buildReviewerForm = () => {
    return (
      <Stack spacing={1}>
        <Box component="h3">Create Review</Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { mt: 0.5, width: '60ch', maxWidth: '100%' },
            '& .MuiButton-root': { width: '15ch', maxWidth: '100%' }
          }}
          onSubmit={handleReviewFormSubmit}
          noValidate
          autoComplete="off"
        >
          <Stack spacing={0}>
            <TextField
              id="reviewFormTitle"
              label="Title"
              placeholder="Title"
              multiline
              
              onChange={(event) => setTitleValue(event.target.value)}
            />
            <Box sx={{mt: 0.5, display: 'flex', alignItems: 'center'}}>
              <Rating name="half-rating" defaultValue={0.5} precision={0.5} 
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setReviewerStarValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setReviewerStarHover(newHover);
                }}
                // emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {reviewerStarValue !== null && (
                <Box sx={{ ml: 2, mb: '0.5rem', alignItems: 'center' }}>{labels[reviewerStarHover !== -1 ? reviewerStarHover : reviewerStarValue]}</Box>
              )}
            </Box>
            <TextField
              id="reviewFormComment"
              label="Comment"
              multiline
              rows={4}
              placeholder="Comment"
              onChange={(event) => setCommentValue(event.target.value)}
            />
            <Box sx={{mt: 0.5, display: 'flex', alignItems: 'center'}}>
              <Rating name="recommended" 
                defaultValue={0} 
                precision={1} 
                max={1}
                getLabelText={getLabelText}
                icon={<ThumbUpIcon fontSize="small" />}
                emptyIcon={<ThumbDownIcon fontSize="small" />}
                onChange={(event, newValue) => {
                  if(newValue === null){
                    newValue = 0
                  };
                  setReviewerRecValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setReviewerRecHover(newHover);
                }}
                // emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {reviewerRecValue !== null && (
                <Box sx={{ ml: 2, mb: '0.5rem', alignItems: 'center' }}>{recommendedLabels[reviewerRecHover !== -1 ? reviewerRecHover : reviewerRecValue]}</Box>
              )}
            </Box>
            <Button sx={{mt: 0.5}} variant="contained" type="submit">Submit</Button>
            {submittedValue === true && (<Box component="span">Submitted Review</Box>)}
          </Stack>
        </Box>
      </Stack>
    )

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
            <Box component="h2" sx={{m: 2, p: 2}}>{productData.title}</Box>
            <Grid item sx={{...gridStyles, p: 3}} xs={12} 
              container
              justifyContent="center"
              alignItems="center"
            >
              <Grid item sx={gridStyles} xs={12} md={5}>
                <Box component="img" sx={imageStyles}
                  src={productData.image}
                  alt={productData.title}
                />
              </Grid>
              <Grid item sx={gridStyles} xs={12} md={7}>
                <Stack spacing={1}>
                  <Box component="h3">Product description
                  </Box>
                    {productData.averageRating !== "" && (
                      <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Rating name="half-rating-read" defaultValue={productData.averageRating ? productData.averageRating : 0} precision={0.5} size="large" readOnly />
                        <Box sx={{ ml: 1, alignItems: 'center' }}>{labels[productData.averageRating]}</Box>
                      </Box>
                    )}
                  <Box component="p">{productData.description}</Box>
                </Stack>
              </Grid>
            </Grid>
            <Grid item sx={gridStyles} xs={12} 
              container
              justifyContent="center"
              alignItems="center"
            >
              <Grid item sx={gridStyles} xs={12} >
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={tabReviewValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleTabReviewChange} aria-label="lab API tabs example">
                        <Tab label="Reviews" value="1" />
                        <Tab label="Create Review" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      {buildReviews(dataReviews)}
                    </TabPanel>
                    <TabPanel value="2">
                      {buildReviewerForm()}
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
