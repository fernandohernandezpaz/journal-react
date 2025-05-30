import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography, Alert } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: '',
  password: '',
  displayName: '',
};

const formValidations = {
  email: [value => value.includes('@'), 'El correo debe de tener una @.'],
  password: [value => value.length >= 6, 'El password debe de tener más de 6 letras'],
  displayName: [value => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch()

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);


  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const { displayName, email, password, formState, errors, isFormValid, onInputChange } = useForm(formData, formValidations);

  const onSubmit = event => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  }


  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={(errors?.displayNameValid?.length ?? 0) && formSubmitted}
                helperText={(errors?.displayNameValid?.length ?? 0) ? errors.displayNameValid : '' }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                 name="email"
                value={email}
                onChange={onInputChange}
                error={(errors?.emailValid?.length ?? 0) && formSubmitted}
                helperText={errors?.emailValid ?? ''}
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                error={(errors?.passwordValid?.length ?? 0) && formSubmitted}
                helperText={errors?.passwordValid ?? ''}
              />
            </Grid>
            
            {
              errorMessage &&
                (<Grid item xs={12}><Alert severity="error">{errorMessage}</Alert></Grid>)
            }

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button type="submit" disabled={isCheckingAuthentication} variant='contained' fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
