import React, {useEffect} from 'react';

import { connect } from "react-redux";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { setChildren } from '../store/actions';





const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },

  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },


  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,

  },

  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    marginBottom: theme.spacing(1),
  },

  ulflex: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    justifyContent:'space-evenly',
    maxWidth: '100%',
    backgroundColor:'gray',
    color: 'white',
    marginBottom: theme.spacing(1),


  },
  dataflex: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    justifyContent:'space-evenly',
    maxWidth: '100%',
    color: 'white',
    marginBottom: theme.spacing(1),




  },
}));



const ChildrenList = (props) => {
  const classes = useStyles();


  useEffect( () => {
    props.setChildren(props.user.id)    
  }, []);



  return (
    <div className={classes.root}>
      <CssBaseline />


      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>

          <Grid  item xs={12}>
            <Paper className={classes.ulflex}>

              {
                !props.children ? (
                  <h2>No Children</h2>
                ):(
                  props.children.map(data => (
                    <div key={data.id}>
                    <h4>{data.name}</h4>
                    <h4 >Total Points: {data.total_points}</h4>
                    <h4 >Streaks: {data.current_streaks}</h4>
                    <Button
                    variant="contained"
                    color="secondary">
                    Remove Child
                    </Button>
                    <Divider />
                    </div>


                    ))
                )

              }

            </Paper>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

function mapStateToProps(state){
  console.log("this is state", state);
  return {
    isFetching: state.children.isFetching,
    children: state.children.children || [],
    user: state.user.user
  };
};
export default connect(
  mapStateToProps, {setChildren})(ChildrenList);
