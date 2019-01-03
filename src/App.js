import React, { Component } from 'react'
import './App.css'

// components
import NavBar from './components/NavBar'
import List from '@material-ui/core/List'
import { mainListItems } from './listItems'
import Preview from './components/Preview'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

// styles
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'

const drawerWidth = 240

class App extends Component {
  state = {
    expression: '',
    text:
      'RegExr was created by gskinner.com, and is proudly hosted by Media Temple.Edit the Expression & Text to see matches. Roll over matches or the expression for details. PCRE & Javascript flavors of RegEx are supported.The side bar includes a Cheatsheet, full Reference, and Help. You can also Save & Share with the Community, and view patterns you create or favorite in My Patterns. Explore results with the Tools below. Replace & List output custom results. Details lists capture groups. Explain describes your expression in plain English.',
    evaluatedText: ''
  }
  handleChange = e => {
    e.preventDefault()
    const inputValue = e.target.value
    this.setState(prevState => ({
      expression: inputValue && inputValue,
      evaluatedText: prevState.text.match(inputValue)
    }))
    // console.log(e.target.value)
  }
  evaluateText = (text, expression) => {
    console.log('text: ', text)
    console.log('expression: ', expression)
    return ''
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar {...this.props} />
        <main className={classes.content}>
          <List>{mainListItems}</List>
          <div className={classes.appBody}>
            <Preview {...this.props} />
            <Typography className={classes.title} variant="h5" component="h2">
              Learn Regex
            </Typography>
            <TextField
              id="standard-name"
              label="Expression"
              className={classes.textField}
              value={this.state.expression}
              onChange={this.handleChange}
              margin="normal"
              inputProps={{color:"white"}}
            />
            <Typography component="p" color="secondary">
              {this.state.text}
            </Typography>
          </div>
        </main>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBody: {
    display: 'flex',
    backgroundColor: '#282c34',
    minHeight: '100vh',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1,
    color: 'white'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    padding: theme.spacing.unit * 3,
    paddingTop: theme.mixins.toolbar.minHeight,
    height: '100vh',
    overflow: 'auto'
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

export default withStyles(styles)(App)
