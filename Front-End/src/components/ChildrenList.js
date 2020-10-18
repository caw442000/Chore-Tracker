import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from "../utils/axiosWithAuth";
import { connect } from "react-redux";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
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
  const [choresList, setChoresList]= useState(null);
  const classes = useStyles();
  const [data, setData] = useState(null);


  useEffect( () => {

    // console.log("useef", props.children)
    // console.log("props.user.id", props.user.id)
    // if(props.user) {


    //   axiosWithAuth()
    //   .get(`/api/parent/children/${props.user.id}`)
    //   .then(response => {
    //     // console.log('child list response: ', response);
    //     // console.log('childs data length',response.data.length);
    //     // console.log('childs data',response.data);
    //     setData(response.data)
  
    //     console.log('new data: ', data);
    // })

    // }
    

    // console.log('on childrens list ', data);
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
