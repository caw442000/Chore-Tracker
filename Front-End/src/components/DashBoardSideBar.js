import React from "react";

import { useHistory } from "react-router-dom";

import {
  Toolbar,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  List,
  Typography,
  Drawer as MUIDrawer,
} from "@material-ui/core";

import MailIcon from "@material-ui/icons/Mail";

import { makeStyles } from "@material-ui/core/styles";

import { ChildrenList } from './ChildrenList';

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

const DashboardSideBar = () => {
  const classes = useStyles();
  const history = useHistory();

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
        <Avatar
          className={classes.avatar}
          src=""
          alt="Cedric Winbush Jr"
        />
        <Typography className={classes.avatarText} variant="h5">
          Cedric Winbush Jr
        </Typography>

        <Divider />
        <List>

          <ChildrenList />
          {/* {menuItems.map((lsItem, key) => (
            <ListItem
              button
              key={key}
              onClick={() => history.push(lsItem.listPath)}
            >
              <ListItemIcon className={classes.listItem}>
                {lsItem.listIcon}
              </ListItemIcon>
              <ListItemText
                className={classes.listItem}
                primary={lsItem.listText}
              />
            </ListItem>
          ))} */}
        </List>
      </div>
    </MUIDrawer>
  );
};

export default DashboardSideBar;
