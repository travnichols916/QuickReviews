import React, { useState, useEffect } from 'react';
import { getMe } from '../../utils/API';
import Auth from '../../utils/auth';

import {
    CssBaseline,
    Box,
    Grid,
    Container,
    Rating,
    Stack,
    Tab,
    Typography,
    Divider
  } from '@mui/material'

import { styled  } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';

import {gridSectionStyles, gridStyles, imageStyles, linkStyles} from './ProfileStyles';
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

const Profile = () => {


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
                    container>
                        <Stack>
                        <Box
                        item>
                            <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>User Information</Typography>
                        </Box>
                        <Box>
                            <Grid>
                                <Stack direction='row' spacing={2} divider={<Divider orientation='vertical' flexItem />}>
                                    <Box sm={6} md={4} lg={3}>Username</Box>
                                    <Box sm={6} md={8} lg={9}>Your Username</Box>
                                </Stack>
                                <Stack direction='row' spacing={2} divider={<Divider orientation='vertical' flexItem />}>
                                    <Box>Email</Box>
                                    <Box>Your Email</Box>
                                </Stack>
                                <Stack direction='row' spacing={2} divider={<Divider orientation='vertical' flexItem />}>
                                    <Button variant='outline'>Change Username</Button>
                                    <Button variant='outline'>Change Email</Button>
                                    <Button variant='outline'>Change Password</Button>
                                </Stack>
                            </Grid>
                        </Box>

                        <Box
                        item>
                            <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>My Reviews</Typography>
                        </Box>
                        <Box>
                            {/*Individual Reviews*/}
                        </Box>
                        </Stack>
                    </Grid>

                    {/*My Reviews */}

                </Grid>
            </ContainerStyled>
        </BoxBackground>
        </>
    )
 }

export default Profile;