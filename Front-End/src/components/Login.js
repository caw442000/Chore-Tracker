import axios from "axios";
// import {Link} from 'react-router-dom'
import React, { useState } from "react";

import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Form, Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { loginUser } from "../store/actions";

let SignupSchema = yup.object().shape({
  username: yup.string().required("This field is required."),
  password: yup
    .string()
    .min(6, "Password is too short.")
    .max(20, "Password is too long.")
    .required("This field is required."),
});
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "tan",
      "& .MuiInputLabel": {
        color: "tan",
      },
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "tan",
      color: "tan",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "tan",
        color: "tan",
      },
      "&:hover fieldset": {
        borderColor: "#511",
        color: "tan",
      },
      "&.Mui-focused fieldset": {
        borderColor: "tan",
        color: "tan",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    width: "600px",
    margin: "0 auto",
    height: "100vh",
  },
  container: {
    // width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    // paddingBottom: "20px",
  },
  paper: {
    // marginTop: theme.spacing(8),
    margin: "10px auto",
    // height: "400px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "tan",
    opacity: "0.7",
    borderRadius: "25px",
    border: "2px solid tan",
  },
  input: {
    color: "tan",
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "tan",
    backgroundColor: "#511",

    "&:hover": {
      color: "#511",
      backgroundColor: "tan",
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [initialValues, setInitialValues] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  const  FormSubmit = async(
    values,
    { setSubmitting, resetForm, setStatus, status }
  ) => {
    // console.log(values);

    await props.loginUser(values);
    console.log("push to dashboard")
    history.push("/dashboard"); // Redirect to Dashboard
  };

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography className={classes.text} component="h1" variant="h5">
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={FormSubmit}
        >
          {({
            errors,
            handleChange,
            touched,
            status,
            handleReset,
            resetForm,
            values,
          }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CssTextField
                    InputProps={{
                      className: classes.input,
                    }}
                    InputLabelProps={{
                      className: classes.input,
                    }}
                    className={classes.text}
                    error={errors.username && touched.username}
                    autoComplete="username"
                    name="username"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="username"
                    label="username"
                    autoFocus
                    value={values.username || ""} // <= Suggested change
                    helperText={
                      errors.username && touched.username
                        ? errors.username
                        : null
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <CssTextField
                    InputProps={{
                      className: classes.input,
                    }}
                    InputLabelProps={{
                      className: classes.input,
                    }}
                    className={classes.text}
                    error={errors.password && touched.password}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="password"
                    label="password"
                    name="password"
                    autoComplete="password"
                    value={values.password || ""} // <= Suggested change
                    helperText={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          New User? <Link to="/signup">Click Here</Link>
        </Typography>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  console.log("this is state in login", state)
  return {
    isFetchingData: state.isFetchingData,
    children: state.children.children,
  };
};

export default connect(mapStateToProps, { loginUser })(Login);
