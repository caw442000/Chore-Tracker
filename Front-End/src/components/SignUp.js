import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

import { Formik, Form } from "formik";
import * as yup from "yup";

let SignupSchema = yup.object().shape({
  name: yup.string().required("This field is required."),
  username: yup.string().required("This field is required."),
  email: yup.string().email().required("This field is required."),
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
    hieght: "100vh",
    minWidth: "400px",
  },
  container: {
    // width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    minWidth: "400px",

    // paddingBottom: "20px",
  },
  paper: {
    // marginTop: theme.spacing(8),
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

const SignUp = (props) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const history = useHistory();

  const FormSubmit = (
    values,
    { setSubmitting, resetForm, setStatus, status }
  ) => {
    // console.log(values);

    axios
      .post("https://choretracker01.herokuapp.com/api/auth/register", values)
      .then((res) => {
        console.log("success", res);
        console.log("this is response data", res.data);
        console.log("initial values", initialValues);

        values = {
          name: "",
          username: "",
          email: "",
          password: "",
        };
        setStatus(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.id);
        history.push("/dashboard"); // Redirect to Dashboard
      })
      .catch((error) => console.log(error.response, "Didn't work"));
  };

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography className={classes.text} component="h1" variant="h5">
          Sign Up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={FormSubmit}
        >
          {({ errors, handleChange, touched, status, handleReset, values }) => (
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
                    error={errors.name && touched.name}
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="name"
                    label="Name"
                    value={values.name || ""} // <= Suggested change
                    autoFocus
                    helperText={
                      errors.name && touched.name ? errors.name : null
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
                    error={errors.username && touched.username}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="uname"
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
                    error={errors.email && touched.email}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={values.email || ""} // <= Suggested change
                    helperText={
                      errors.email && touched.email ? errors.email : null
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
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
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
                Sign Up
              </Button>
              <Typography>
                Already Have An Account <Link to="/login">Click Here</Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default SignUp;
