import React from 'react'

// components
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export default props => {
  return (
    <Card style={styles.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Preview Window
        </Typography>
      </CardContent>
    </Card>
  )
}

const styles = {
  card: {
    // position: 'absolute',
    margin: 10,
    width: 350,
    minHeight: 200,
    alignSelf: 'flex-end'
  }
}
