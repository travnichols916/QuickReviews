import React, { useState, useEffect } from 'react';

import {
    CssBaseline,
    Box,
    Grid,
    Container,
    Rating,
    Stack,
    Tab,
    Typography,
    Link,
    Divider,
    Button
  } from '@mui/material'

import { styled  } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';

import {gridSectionStyles, gridStyles, imageStyles, linkStyles} from './FooterStyles';

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
        <BoxBackground> <CssBaseline />
            <ContainerStyled>
                <Grid
                container
                spacing={2}
                justifyContent="start"
                alignItems="center"
                textAlign='left'
                >
                    <Stack margin={2} spacing={2} divider={<Divider orientation='horizontal' flexItem />}>
                        <Box>Have any questions? Reach out to us at the following:</Box>
                        <Box>
                            <Grid>
                                <Stack direction='row' spacing={3} divider={<Divider orientation='vertical' flexItem />}>
                                    <Link>Libin's Github</Link>
                                    <Link>Eric's Github</Link>
                                </Stack>
                                <Stack direction='row' spacing={2} divider={<Divider orientation='vertical' flexItem />}>
                                <Link>Travis's Github</Link>
                                <Link>Alan's Github</Link>
                                </Stack>
                            </Grid>
                            
                            

                        </Box>
                    </Stack>

                    <Stack>
                        About Us Page
                    </Stack>
                </Grid>
            </ContainerStyled>
        </BoxBackground>
        </>
    )
}

export default Footer;