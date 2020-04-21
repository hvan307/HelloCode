import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import auth from '../../lib/auth'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const MyProfile = () => {

  const [data, setData] = useState({ image: '', username: '', timezone: '', languages: [] })

  const id = auth.getUserId()

  useEffect(() => {
    console.log(id)
    axios.get(`/api/user/${id}/`)
      .then(resp => setData(resp.data))
  }, [])

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
            image={data.image}
            // image="#"
            title="User Profile Picture"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Username: {data.username}
          </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Timezone: {data.timezone}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              Languages: {data.languages.map((language) => (<p key={language.id}>{language.name}</p>))}
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