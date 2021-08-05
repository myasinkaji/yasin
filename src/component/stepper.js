import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));


export default function HorizontalLinearStepper(props) {
    const classes = useStyles();
    const {steps, handleFinish, nextButtonIsActive} = props;
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            handleFinish()
            setActiveStep(0)
        } else
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function getStepContent(step) {
        return steps[step].content;
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation='horizontal'>
                {steps.map(step => (
                    <Step key={step.label}>
                        <StepLabel><Typography>{step.label}</Typography></StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>

                <div>
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                    <div>
                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                            Back
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            disabled={nextButtonIsActive(activeStep)}
                            onClick={handleNext}
                            className={classes.button}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
