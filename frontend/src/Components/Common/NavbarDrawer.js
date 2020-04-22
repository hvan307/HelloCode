import React, { useState } from 'react'
import clsx from 'clsx'
import { Link, withRouter } from 'react-router-dom'

import auth from '../../lib/auth'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// import InboxIcon from '@material-ui/icons/MoveToInbox'
import SmsRoundedIcon from '@material-ui/icons/SmsRounded'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
// import MenuItem from '@material-ui/core/MenuItem'
// import Menu from '@material-ui/core/Menu'
import Badge from '@material-ui/core/Badge'
// import NotificationsIcon from '@material-ui/icons/Notifications'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AddBoxIcon from '@material-ui/icons/AddBox'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'


const DrawerMenu = () => {
  const drawerWidth = 240
  // styling - move to scss
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexGrow: 1
    },
    title: {
      flexGrow: 1
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginBottom: 0,
      paddingBottom: 0,
      paddingTop: 0,
      marginLeft: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginBottom: 0,
      paddingBottom: 0,
      paddingTop: 0,
      marginLeft: 0

    }
  }))

  const classes = useStyles()
  const theme = useTheme()

  // State for the left-hand side drawer menu
  const [openDrawer, setOpenDrawer] = useState(false)
  // State for the right-hand side icon menu
  const [anchorMenu, setAnchorMenu] = useState(null)
  const openMenu = Boolean(anchorMenu)
  // const [auth, setAuth] = useState(true)
  // State for the logged in user profile menu
  const [anchorEl, setAnchorEl] = useState(null)
  const openIcon = Boolean(anchorEl)

  // Handler functions
  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  // const handleMenu = (event) => {
  //   setAnchorMenu(event.currentTarget)
  // }

  // const handleMenuClose = () => {
  //   setAnchorMenu(null)
  // }

  // const handleProfileMenu = (event) => {
  //   setAnchorEl(event.currentTarget)
  // }

  // const handleProfileClose = () => {
  //   setAnchorEl(null)
  // }

  const handleLogout = () => {
    auth.logOut()
  }

  const isLoggedIn = auth.isLoggedIn()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer
        })}
      >
        {/* Drawer left-hand side menu */}
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, openDrawer && classes.hide)}
          >
            <Badge badgeContent='•' color='secondary'>
              <MenuIcon />
            </Badge>
          </IconButton>

          <Link
            to='/'
            className={classes.title}
            style={{ color: 'white', textDecoration: 'none' }}
            onClick={handleDrawerClose}
          >
            <Typography
              variant='h6'
              id='app-title'
            >
              ('Hello Code!')
            </Typography>
          </Link>
          {/* Right-hand side Menu - Profile Menu */}
          {/* {auth && ( */}
          {/* {isLoggedIn && <div> */}
          {/* <IconButton
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleProfileMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id='menu-profile'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={openIcon}
              onClose={handleProfileClose}
            >
              <MenuItem onClick={handleProfileClose}>
                <Link to='/myprofile'>
                  My Profile
                </Link>
              </MenuItem>
              {/* change to handleLogout */}
          {/* <MenuItem onClick={handleProfileClose}>
                <Link
                  to='/'
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </MenuItem>
            </Menu> */}
          {/* </div> */}
          {/* Right-hand side menu - Notifications */}
          {/* <Badge badgeContent={1} color='secondary'>
            <IconButton
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <MoreVertIcon margin='0' padding='0' />
            </IconButton>
          </Badge>
          <Menu
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={openMenu}
            onClose={handleMenuClose}
          >
            <IconButton
              onClick={handleMenuClose}
              aria-label='new chat notifications'
              color='inherit'
            >
              {/* change badgeContent */}
          {/* <Badge badgeContent={4} color='secondary'>
                <Link to='/mychats' style={{ color: 'black' }}>
                  <SmsRoundedIcon />
                </Link>
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleMenuClose}
              aria-label='invite notifications'
              color='inherit'
            >
              {/* change badgeContent */}
          {/* <Badge badgeContent={17} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Menu> */}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

        {/* Visitor's view */}
        {!isLoggedIn && 
        <List>
      {[<Link to={'/register'} onClick={handleDrawerClose}>Register</Link>, <Link to={'/login'} onClick={handleDrawerClose}>Login</Link>].map((text, i) => (
            <ListItem button key={i}>
              <ListItemIcon>{<AccountCircle />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>}
        <Divider />
        {!isLoggedIn && 
        <List>
          {[<Link to={'/'} onClick={handleDrawerClose}>Home</Link>].map((text, i) => (
            <ListItem button key={i}>
              <ListItemIcon>{<HomeRoundedIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>}

        {/* LoggedIn User View */}
        {isLoggedIn && 
        <List>
          {[<Link to={'/myprofile'} onClick={handleDrawerClose}>My Profile</Link>, <Link to={'/mychats'} onClick={handleDrawerClose}>My Chats</Link>, <Link to={'/newchat'} onClick={handleDrawerClose}>New Chat</Link>].map((text, i) => (
            <ListItem button key={i}>
              <ListItemIcon>{i === 0 ? <AccountCircle /> : i === 1 ? <Badge badgeContent={1} color='secondary'><SmsRoundedIcon /></Badge> : <AddBoxIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>}
        <Divider />
        {isLoggedIn && 
        <List
          onClick={handleLogout}
        >
          {[<Link to={'/'} onClick={handleDrawerClose}>Log Out</Link>].map((text, i) => (
            <ListItem button key={i}>
              <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: openDrawer
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  )
}


export default withRouter(DrawerMenu)