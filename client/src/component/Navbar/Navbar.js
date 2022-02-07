import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button, ButtonBase } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memoriesLogo from '../../images/logo.JPG';
import memoriesText from '../../images/memories.jpg';
import * as actionType from '../../constants/actionTypes';
import useStyles from './Styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/auth');
    setUser(null);
  };
  const  openPost = () => {
    navigate('/UserProfile')
  }
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
        <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      ><Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
      </ButtonBase>
            <Typography className={classes.userName} variant="h6">&nbsp;{user?.result.name.slice(0, 6)}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button variant="contained" color="primary"><Link className={classes.link} to="/auth">Sign in</Link></Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;