import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
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

const Profile = () => {
    const { loading, error, data } = useQuery(QUERY_ME);
    
    console.log(data)

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        console.error(error);
        return <div>Error!</div>;
    }

      if (!Auth.loggedIn) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }


    return (
        <>
        <BoxBackground> <CssBaseline />
            <ContainerStyled>
                <Grid
                    container 
                    spacing={0}
                    justifyContent="center"
                    alignItems="center"
                >
                    {/*User Information */}
                    <Grid
                    container
                    sx={gridSectionStyles}>
                        <Stack>
                        <Box
                        item
                        sx={gridStyles}>
                            <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>User Information</Typography>
                        </Box>
                        <Box
                        item
                        sx={gridStyles}>
                            <Grid>
                                <Stack direction='row' spacing={2} divider={<Divider orientation='vertical' flexItem />} item
                        sx={gridStyles}>
                                    <Box sm={6} md={4} lg={3}>Username</Box>
                                    <Box sm={6} md={8} lg={9}>{data.me.username}</Box>
                                </Stack>
                                <Stack direction='row' spacing={2} divider={<Divider orientation='vertical' flexItem />} item
                        sx={gridStyles}>
                                    <Box>Email</Box>
                                    <Box>{data.me.email}</Box>
                                </Stack>
                                <Stack direction='row' spacing={2} divider={<Divider orientation='vertical' flexItem />} item
                        sx={gridStyles}>
                                    <Button variant='outline'>Change Username</Button>
                                    <Button variant='outline'>Change Email</Button>
                                    <Button variant='outline'>Change Password</Button>
                                </Stack>
                            </Grid>
                        </Box>
                        </Stack>
                    </Grid>

                    {/*My Reviews */}
                    <Grid
                    container
                    sx={gridSectionStyles}>
                        <Stack>
                        <Box
                        item
                        sx={gridStyles}>
                            <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>My Reviews</Typography>
                        </Box>
                        <Box
                        item
                        sx={gridStyles}>
                            <Stack>
                                {/*Individual Reviews*/}
                                <ProfileIndivReview />
                            </Stack>
                        </Box>
                        </Stack>
                    </Grid>

                </Grid>
            </ContainerStyled>
        </BoxBackground>
        </>
    )
 }


export default Profile;