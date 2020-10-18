import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { Formik, Form } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";

import { addChild, setChildren } from "../store/actions";

let SignupSchema = yup.object().shape({
  name: yup.string().required("This field is required."),
  username: yup.string().required("This field is required."),
  password: yup
    .string()
    .min(6, "Password is too short.")
    .max(20, "Password is too long.")
    .required("This field is required."),
});

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues = {
  name: "",
  username: "",
  password: "",
};

const AddChild = (props) => {
  const classes = useStyles();
  const [childinfo, setChildinfo] = useState(initialValues);
  const [chores, setChores] = useState([]);
  const [child, setChild] = useState("");
  const [open, setOpen] = useState(false);
  // const id = localStorage.getItem("id");
  const childArrayLength = 0;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setChildinfo(event.target.value);
  };

  const FormSubmit = async(e) => {
    e.preventDefault();
    console.log("These are values", childinfo);
    await props.addChild(childinfo, props.user.id)
    SetChildrenArray(props.user.id);
    setChildinfo(initialValues)
    handleClose();
  };

  const SetChildrenArray = async(id) => {
    await props.setChildren(id)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <button type="button" onClick={handleOpen}>
          ADD CHILD
        </button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Add Child
              </Typography>
              <Formik
                validationSchema={SignupSchema}
                onSubmit={(e) => FormSubmit()}
              >
                {({ errors, handleChange, touched, status }) => (
                  <Form className={classes.form}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          error={errors.name && touched.name}
                          autoComplete="name"
                          name="name"
                          variant="outlined"
                          fullWidth
                          onChange={(e) =>
                            setChildinfo({ ...childinfo, name: e.target.value })
                          }
                          value={childinfo.name}
                          id="name"
                          label="Child's Name"
                          autoFocus
                          helperText={
                            errors.name && touched.name ? errors.name : null
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={errors.username && touched.username}
                          variant="outlined"
                          fullWidth
                          onChange={(e) =>
                            setChildinfo({
                              ...childinfo,
                              username: e.target.value,
                            })
                          }
                          value={childinfo.username}
                          id="username"
                          label="username"
                          name="username"
                          autoComplete="uname"
                          helperText={
                            errors.username && touched.username
                              ? errors.username
                              : null
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={errors.password && touched.password}
                          variant="outlined"
                          fullWidth
                          onChange={(e) =>
                            setChildinfo({
                              ...childinfo,
                              password: e.target.value,
                            })
                          }
                          value={childinfo.password}
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
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
                      onClick={FormSubmit}
                      onSubmit={handleClose}
                    >
                      Add Child
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </Fade>
        </Modal>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    isFetchingData: state.isFetchingData,
    user: state.user.user
  };
};

export default connect(mapStateToProps, { addChild, setChildren })(AddChild);
