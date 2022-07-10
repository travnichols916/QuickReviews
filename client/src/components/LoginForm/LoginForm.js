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
  Stack,
  FormControlLabel,
  Checkbox,
  Input,
  InputLabel,
  TextField
} from '@mui/material'
import { styled  } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { borderBottom, textAlign } from '@mui/system';

import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutation';

import Auth from '../../utils/auth';

const LoginForm = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);
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

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
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

              {/* Password */}
              <TextField id='password' name='password' value={formState.password} onChange={(e) => handleChange(e)} label="Password" variant="standard" required></TextField>

              {/* Submit Button */}
              <Button 
              disabled={!formState.email && !formState.username && !formState.password} 
              type="submit" 
              label='Login'>
                Login
              </Button>
            </Stack>
          
          </form>
          

    </Grid>
    </>
  );
};

export default LoginForm;
