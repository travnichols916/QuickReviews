import React, { useState } from 'react';

import {
  Button,
  IconButton,
  Grid,
  TextField,
  InputAdornment,
  Stack
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutation';

import Auth from '../../utils/auth';

const SignupForm = () => {
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);
  const [validated] = useState(false);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
              <TextField id='password' name='password' type={values.showPassword ? 'text' : 'password'} value={formState.password} onChange={(e) => handleChange(e)} label="Password" variant="standard" required
              endAdornment={
                <InputAdornment position="end">
                <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </InputAdornment>
                }></TextField>

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