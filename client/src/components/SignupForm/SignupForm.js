import React, { useState } from 'react';

import {
  Container,
  Link,
  AppBar,
  Box,
  Button,
  IconButton,
  FormControl,
  FormGroup,
  Grid,
  FormControlLabel,
  Checkbox,
  Input,
  InputLabel,
  TextField,
  Stack
} from '@mui/material'
import { styled  } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { borderBottom, textAlign } from '@mui/system';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutation';

import Auth from '../../utils/auth';

const SignupForm = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);
  const [validated] = useState(false);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log('hello')
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Grid>
          {/* Div to Hold */}
          <form
          validated={validated}
          onSubmit={(e) => handleFormSubmit(e)}
          >

            {/* Inputs */}
            <Stack>
              {/* Email */}
              <TextField id='email' name='email' value={formState.email} onChange={(e) => handleChange(e)} label="Email" variant="standard" required></TextField>
              
              {/* Username */}
              <TextField id='username' name='username' value={formState.username} onChange={(e) => handleChange(e)} label="Username" variant="standard" required></TextField>

              {/* Password */}
              <TextField id='password' name='password' value={formState.password} onChange={(e) => handleChange(e)} label="Password" variant="standard" required></TextField>

              {/* Submit Button */}
              <Button 
              disabled={!formState.email && !formState.username && !formState.password} 
              type="submit" 
              label='Sign Up'>
                Sign Up
              </Button>
            </Stack>
          
          </form>
          

    </Grid>
    </>
  );
};

export default SignupForm;