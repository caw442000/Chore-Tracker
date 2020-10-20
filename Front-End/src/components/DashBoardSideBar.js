import React from "react";

import { useHistory } from "react-router-dom";

import {
  Toolbar,
  Avatar,
  Divider,
  List,
  Typography,
  Drawer as MUIDrawer,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import ChildrenList from "./ChildrenList";
import { connect } from "react-redux";

//CSS Styles

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#511",
  },
  drawerContainer: {
    overflow: "auto",
    margin: "4rem 0",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  avatar: {
    display: "block",
    margin: "2rem auto",
    // paddingBottom: '2rem',
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  listItem: {
    color: "tan",
  },
  avatarText: {
    color: "tan",
    textAlign: "center",
  },
  avatarEmail: {
    color: "tan",
    textAlign: "center",
    margin: "10px auto",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

const DashboardSideBar = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const pass = "pass prop";
  console.log("state passed from map", props.children);

  return (
    <MUIDrawer
      className={classes.drawer}
      anchor="left"
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <Avatar className={classes.avatar} src="" alt="Family Avatar" />
        <Typography className={classes.avatarText} variant="h5">
          {props?.user?.name} Family
        </Typography>

        <Divider />
        <List>
          <ChildrenList />
        </List>
      </div>
    </MUIDrawer>
  );
};

function mapStateToProps(state) {
  console.log("this is state", state);
  return {
    isFetching: state.children.isFetching,
    children: state.children.children || [],
    user: state.user.user,
  };
}
export default connect(mapStateToProps, {})(DashboardSideBar);
