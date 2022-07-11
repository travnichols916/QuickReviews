import React, { useState } from 'react';

import {
  Button,
  IconButton,
  Grid,
  Stack,
  InputAdornment,
  TextField
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutation';

import Auth from '../../utils/auth';

const LoginForm = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
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

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
