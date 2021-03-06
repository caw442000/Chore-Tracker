import React, {useEffect} from 'react';
import { connect } from "react-redux";

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import { axiosWithAuth } from '../utils/axiosWithAuth'

import { setChores } from '../store/actions';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    // height: '100vh',
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
    height: 240,
  },
  fixedNavHeight: {
    height: 60,
  },
}));


const ChoreList = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const deleteChore = (chore) =>{
    console.log(chore.id);

      axiosWithAuth()
        .delete(`/api/chores/chore/${chore.id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedNavHeightPaper = clsx(classes.navpaper, classes.fixedNavHeight);

  useEffect(() => {
    props.setChores(props.user.id)


  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid item xs={12} md={8} lg={9}>
            {
                !props.chores ? (
                  <h2>No Chores Added</h2>
                ):(
                  props.chores.map(chore => (
                    <ul
                    key={chore.id}
                    choreid={chore.id}
                    >
                    {chore.name}
                    {chore.description}
                    <span onClick={() => deleteChore(chore)}>❌</span></ul>
                  ))
                )

              }
          </Grid>
        </Container>
      </main>
    </div>
  );
};

function mapStateToProps(state){
  console.log("this is state in chores", state);
  return {
    isFetching: state.chores.isFetching,
    chores: state.chores.chores || [],
    user: state.user.user
  };
};

export default connect(
  mapStateToProps, {setChores}) (ChoreList);
