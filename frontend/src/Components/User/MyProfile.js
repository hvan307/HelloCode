import React, { useState, useLayoutEffect } from 'react'
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
import FaceIcon from '@material-ui/icons/Face'
import PublicIcon from '@material-ui/icons/Public'
import ComputerRoundedIcon from '@material-ui/icons/ComputerRounded'
import { FormHelperText } from '@material-ui/core'

const MyProfile = (props) => {

  const [data, setData] = useState({ image: '', username: '', timezone: '', languages: [] })

  const id = auth.getUserId()

  useLayoutEffect(() => {
    console.log(id)
    axios.get(`/api/user/${id}/`)
      .then(resp => setData(resp.data))
  }, [])

  const useStyles = makeStyles({
    root: {
      maxWidth: 800
    },
    media: {
      height: 150,
      width: 150
    }
  })

  const classes = useStyles()

  const handleEdit = (event) => {
    props.history.push('/edit-profile')
  }

  return (
    <div className="profile-main">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            id="card-media-pic"
            image={data.image ? `http://localhost:4000${data.image}` : 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'}
            title="User Profile Picture"
          />
          <CardContent className='my-profile-content'>
            <Typography gutterBottom variant="h5" component="h2">
              <FaceIcon className="face-icon"/> <span>Username: {data.username}</span>
            </Typography>
            {/* Bio? */}
            <Typography variant="body2" color="textSecondary" component="p">
              <PublicIcon className="world-icon"/> <span>Timezone: {data.timezone}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <ComputerRoundedIcon className="computer-icon"/> <span className="languages-after-icon">Languages: {data.languages.map((language) => (<li className='my-profile-language'  key={language.id}>{language.name}</li>))}</span>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions id="profile-links-container">
          <Link to={'/newchat'}>
            <Button size="small" color="primary">
              Start new chat!
            </Button>
          </Link>
          <Button size="small" color="primary" onClick={handleEdit} id="edit-profile-button">
          Edit Profile
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default MyProfile