import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateProblemForm from '../components/CreateProblem/CreateProblemForm'
import ProblemDescriptionForm from '../components/CreateProblem/ProblemDescriptionForm'
import GenerateTestData from '../components/CreateProblem/GenerateTestData';
import NavBar from '../components/NavBar'

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
  stepContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  stepContentBody: {
    width: '60%',
    marginBottom: '20px'
  },
  stepper: {
    marginLeft: '15%',
    marginRight: '15%'
  }
}));

function getSteps() {
  return ['題目敘述', '設定測試資料', '基本資訊'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ProblemDescriptionForm />
    case 1:
      return <GenerateTestData />
    case 2:
      return <CreateProblemForm />;
    default:
      return null;
  }
}

export default function CreateProblemPage() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  console.log(activeStep, steps.length)
  return (
    <div className={classes.root}>
      <NavBar context="Bow-Code" />
      <Stepper className={classes.stepper} activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div className={classes.stepContent}>
        <div className={classes.stepContentBody}>
          {getStepContent(activeStep)}
        </div>
        <div>
          {
            activeStep !== 0 && <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
              上一步
            </Button>
          }
          {
            activeStep !== steps.length - 1 && <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              下一步
            </Button>
          }
        </div>
      </div>
    </div>
  );
}