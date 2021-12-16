import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid, InputLabel } from '@material-ui/core';

function FormInput({ name, label, required }) {
  const { control } = useFormContext();
//   const isError = false;


  return (
    <Grid item xs={12} sm={6}>
        <InputLabel>{label}</InputLabel>
   
         <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <TextField
                    hiddenLabel
                    fullWidth
                    label={label} 
                    required
                    variant="outlined"
                />
            )}
        />
     </Grid>
  );
}

export default FormInput;

// IGNORE THIS 
{/* <Controller
    render={({ field }) => <TextField {...field} />}
    name={name}
    control={control}
    label={label}
    fullWidth
    required={required}
    error={isError}
    variant="outlined"
/> */}

