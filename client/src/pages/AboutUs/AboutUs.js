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

import {gridSectionStyles, gridStyles, imageStyles , linkStyles} from './AboutUsStyles';

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

const AboutUs = () => {

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
                    
                    <Grid
                        container 
                        spacing={0}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid
                            item sx={gridSectionStyles} xs={12}
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            {/*Alan */}
                            <Grid item sx={gridStyles} xs={12} spacing={2}>
                                <Stack
                                sx={{
                                display: 'flex',
                                justifyContent:"center",
                                alignItems:"center"}}>
                                    <Grid item sx={gridStyles} xs={12} md={8} lg={8}>
                                        <Box component="h2" sx={{textAlign: 'center'}}>Alan Anibal Souza Ramos</Box>
                                    </Grid>
                                    <Grid>
                                        <Box component='img' sx={imageStyles}
                                        src='https://cdn.discordapp.com/attachments/122572496741335040/994638391234793522/Alan.jpg'
                                        alt=''
                                        />
                                    </Grid>
                                </Stack>
                            </Grid>
                                

                            {/*Eric */}
                            <Grid item sx={gridStyles} xs={12} spacing={2}>
                                <Stack
                                sx={{
                                display: 'flex',
                                justifyContent:"center",
                                alignItems:"center"}}>
                                    <Grid item sx={gridStyles} xs={12} md={8} lg={8}>
                                        <Box component="h2" sx={{textAlign: 'center'}}>Eric Ng</Box>
                                    </Grid>
                                    <Grid>
                                        <Box component='img' sx={imageStyles}
                                        src='https://via.placeholder.com/700x700'
                                        alt=''
                                        />
                                    </Grid>
                                </Stack>
                            </Grid>

                            {/*Libin */}
                            <Grid item sx={gridStyles} xs={12} spacing={2}>
                                <Stack
                                sx={{
                                display: 'flex',
                                justifyContent:"center",
                                alignItems:"center"}}>
                                    <Grid item sx={gridStyles} xs={12} md={8} lg={8}>
                                        <Box component="h2" sx={{textAlign: 'center'}}>Libin Wang</Box>
                                        </Grid>
                                    <Grid>
                                        <Box component='img' sx={imageStyles}
                                        src='https://cdn.discordapp.com/attachments/122572496741335040/942512311275495454/Profile_Pic.png'
                                        alt=''
                                        />
                                    </Grid>
                                </Stack>
                            </Grid>

                            {/*Travis */}
                            <Grid item sx={gridStyles} xs={12} spacing={2}>
                                <Stack
                                sx={{
                                display: 'flex',
                                justifyContent:"center",
                                alignItems:"center"}}>
                                    <Grid item sx={gridStyles} xs={12} md={8} lg={8}>
                                        <Box component="h2" sx={{textAlign: 'center'}}>Travis Nichols</Box>
                                        </Grid>
                                    <Grid>
                                        <Box component='img' sx={imageStyles}
                                        src='https://cdn.discordapp.com/attachments/122572496741335040/994638391511625859/Travis.jpg'
                                        alt=''
                                        />
                                    </Grid>
                                </Stack>
                            </Grid>

                        </Grid>
                    </Grid>



                </Grid>
            </ContainerStyled>
        </BoxBackground>

        </>
    )
}

export default AboutUs;