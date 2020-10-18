import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
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
import { ChoreList } from './ChoreList';
import { ChildrenList } from './ChildrenList';
import ChoreAdder  from './ChoreAdder';
import AddChild from './AddChild';

import {axiosWithAuth} from '../utils/axiosWithAuth';
import EditParent from "./EditParent";
import DashboardSideBar from "./DashBoardSideBar";
import Copyright from "./CopyRight";

import { connect } from "react-redux";

import { resetChildren, resetUser, setChildren } from "../store/actions";



const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: 'gray',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  // appBarShift: {
  //   marginLeft: drawerWidth,
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  navpaper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'row',
    justifyContent:'space-evenly'
  },
  fixedHeight: {
    height: 400,
  },
  fixedNavHeight: {
    height: 60,
  },
}));





const Dashboard = props => {

  const id = localStorage.getItem('id');
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [data, setData] = useState([]);
  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedNavHeightPaper = clsx(classes.navpaper, classes.fixedNavHeight);


  // useEffect(() => {

  //     axiosWithAuth()
  //     .get (`/api/parent/${id}`)
  //     .then(res => {
  //       console.log('res.data: ',res.data)
  //       setData(res.data)

  //     })
  //     .catch(err => console.log(err))

  // }, [])

  const logout = async() => {
    localStorage.clear()
    // localStorage.removeItem('id');
    // localStorage.removeItem('token');
    
    // await props.resetChildren();
 

    
    
    history.push('/login')
  }

    
 


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {props.user.name} Chore Tracker
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <EditParent
          id={props.user.id}
          name={props.user.name}
          username={props.user.username}
          email={props.user.email}
          />
          <Button
          color="primary"
          onClick={() => logout()}>Logout</Button>
        </Toolbar>
      </AppBar>
      <DashboardSideBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
          <Grid item xs={12}>
              <Paper className={fixedNavHeightPaper}>
                {/* <Chart /> */}
                <Button color="inherit">Home</Button>
                <ChoreAdder />
                <AddChild />

              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Typography component="h2" >Family Chore List</Typography>
                <ChoreList/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <h4>GAMIFY COMPONENTS</h4>
                <p>High Score: Child and Total</p>
                <p>Longest Streak: Child and Total</p>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("this is state in login", state)
  return {
    user: state.user.user,
  };
};
export default connect(mapStateToProps, {resetChildren, resetUser, setChildren})(Dashboard);