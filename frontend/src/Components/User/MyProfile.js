import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const MyProfile = () => {

  const useStyles = makeStyles({
    root: {
      maxWidth: 800
    },
    media: {
      height: 300,
      width: 250
    }
  })

  const classes = useStyles()

  return (
    <div className="profile-main">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://www.vippng.com/png/detail/363-3631798_profile-placeholder-woman-720-profile-image-placeholder-png.png"
            title="User Profile Picture"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Username
          </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Timezone
          </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to={'/newchat'}>
            <Button size="small" color="primary">
              Start new chat!
          </Button>
          </Link>
          {/* <Button size="small" color="primary">
          Something else?
        </Button> */}
        </CardActions>
      </Card>
    </div>
  )
}

export default MyProfile