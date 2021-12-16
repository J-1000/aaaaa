import React, { useState } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import useStyles from './styles'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps = ['Shipping address', 'Payment details'];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();
    
    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    )
    // I have three different components 1.AddressForm 2.PaymentForm | then if were done with all the steps we have  3.Confirmation 
    // if were currently on the activeStep that is === 0
    // then we want to show to AddressForm componenet 
    // but if were not on the first step, then we want to render PaymentForm
    const Form = () => activeStep === 0
        ? <AddressForm />
        : <PaymentForm />
    return (
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    { activeStep === steps.length ? <Confirmation /> : <Form />}

                </Paper>
            </main>
        </>
    )
}

export default Checkout
