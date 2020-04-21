import React from 'react'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

// add cool background picture

const Home = () => {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0)
    },
    button: {
      margin: theme.spacing(1)
    }
  }))

  const classes = useStyles()

  return <>
    <div className="home-main-container">
      <div className="home-main">
        <h1>Welcome to HelloCode!</h1>
        <h2>Join millions of coders helping each other!</h2>
        <h3>We'll match you with someone so you can start chatting!</h3>
        <Link to={'/login'}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Log In
          </Button>
        </Link>
        <Link to={'/register'}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  </>
}

export default Home