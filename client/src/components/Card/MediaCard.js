import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    maxWidth: 250
  },
  media: {
    height: 200
  }
}

const actionWidth = {
  width: '100%'
}

function MediaCard(props) {
  const { classes } = props
  return (
    <Card className={classes.card}>
      <CardActionArea
        disableTypography
        style = {actionWidth}
      >
        <CardMedia
          className={classes.media}
          image={props.currentTab.image}
          title='Contemplative Reptile'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.currentTab.name}
          </Typography>
          {console.log('Media Card props below')}
          {console.log(props)}
          <Typography component='p'>
            {props.currentTab.address1}
            <br />
            {props.currentTab.address2}
            <br />
            {props.currentTab.address3}
            <br />
            Rating : {props.currentTab.rating}
            <br />
            Reviews : {props.currentTab.reviewCount}

          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  )
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MediaCard)
