import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Avatar,
  Button,
  Grid,
  TextField,
  CssBaseline,
  AppBar,
  Toolbar,
  Divider,
  IconButton,
  Typography,
  Chip
} from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { withStyles } from '@material-ui/core/styles'

import MenuIcon from '@material-ui/icons/Menu'
import UnbindedLeftDashboard from './LeftDashboard'
import UnbindedWhiteBoard from './WhiteBoard'

import data from './data';
const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex'
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
    marginLeft: 12,
    marginRight: 20
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
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
})

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
})



// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

// Moves an item from one list to another list.
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}



class App extends React.Component {

  state = {
    open: true,
    operatorsList: data.getOperators(),
    flagList: data.getFlags(),
    selectedList: []
  }

  id2List = {
    droppable: 'operatorsList',
    droppable2: 'selectedList'
  }

  getList = id => this.state[this.id2List[id]]

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  handleChange = field => e => {
    e.preventDefault()
    const inputValue = e.target.value
    this.setState(prevState => ({
      [field]: inputValue && inputValue
      // evaluatedText: prevState.text.match(inputValue)
    }))
    console.log('target value: ', e.target.value)
    this.evaluateText(this.state.text, e.target.value)
  }
  evaluateText = (text, expression) => {
    // let something = RegExp(expression, 'g')
    console.log('text: ', text)
    console.log('expression: ', new String(expression.source))
    console.log('evaluatedText: ', expression.split(''))
    return ''
  }

  onDragEnd = result => {
    // console.log(result)
    const { source, destination } = result
    // dropped outside the list
    if (!destination) {
      return
    }
    if (source.droppableId === destination.droppableId) {
      const newList = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      )

      let state = { newList }
      if (source.droppableId === 'droppable2') state = { selected: newList }
      this.setState(state)
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      )
      this.setState({
        operatorsList: result.droppable,
        selectedList: result.droppable2
      })
    }
  }

  handleFlagClick = id => {
    let { flagList } = this.state

    const newFlagList = flagList.map((flag, idx) => {
      if (flag.id === id) flag.flagged = !flag.flagged
      return flag
    })

    this.setState({ flagList: newFlagList })
  }

  render() {
    const LeftDashboard = UnbindedLeftDashboard.bind(this);
    const WhiteBoard = UnbindedWhiteBoard.bind(this);
    const { classes, theme } = this.props
    const { open } = this.state

    let concatenatedExpression = ''

    this.state.selectedList.forEach((item, index) => {
      console.log(item)
      if (index === 0) {
        concatenatedExpression = concatenatedExpression.concat(item.expression)
        return (concatenatedExpression = concatenatedExpression.concat(
          item.value
        ))
      }
      concatenatedExpression = concatenatedExpression.concat(item.value)
      concatenatedExpression = concatenatedExpression.concat(item.expression)
    })
    console.log('concat: ', concatenatedExpression)
    let flags = ''
    this.state.flagList.forEach(flag =>
      flag.flagged && flag.id !== 'flagSplitter'
        ? (flags = flags.concat(flag.expression))
        : null
    )
    let expression
    try {
      new RegExp(concatenatedExpression, flags)
      expression = new RegExp(concatenatedExpression, flags)
      this.regexError = ''
      this.regexSource = expression.source;
    } catch (err) {
      expression = ''
      console.log(err)
      this.regexError = 'This regex executes with Error. :(';

    }
    console.log('EXPRESSION IS', expression)
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className={classes.root}>
          <CssBaseline />

          <LeftDashboard  />
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open
            })}
          >
            <div className={classes.drawerHeader} />

            <Grid item style={{ flex: '0.5 0 50%' }}>
              {/* <Preview {...this.props} /> */}
              {/* <DragDropContext onDragEnd={this.onDragEnd2}> */}
              <WhiteBoard />
            </Grid>
            <Grid item style={{ flex: '0.1 0 10%', width: '100%' }}>
              <TextField
                label="Text To Evaluate"
                className={classes.textField}
                value={this.state.text}
                onChange={this.handleChange('text')}
                margin="dense"
                multiline={true}
                variant="outlined"
                rowsMax="5"
                rows="5"
                style={{ width: '100%' }}
                InputProps={{
                  inputProps: {
                    style: { color: 'white' }
                  }
                }}
              />
            </Grid>
            {/*<Grid item style={{flex : '0.2 0 20%'}}>
              <Typography
                component="h5"
                variant="h5"
                color="secondary">
                {this.state.text}
              </Typography>
            </Grid>*/}
            <Grid item style={{ flex: '0.3 0 30%', width: '100%' }}>
              <Typography variant="h4" align="center" color="secondary">
                Rsultsss
              </Typography>
              <Typography style={{ color: 'green' }} variant="h4" component="p">
                {this.state.text && this.state.text.match(expression)}
              </Typography>
            </Grid>
          </main>
        </div>
      </DragDropContext>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles)(App)
