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


const reorder = (source, destination) => {
  //
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
  }

  //if destination is whiteBoard
  //if source is whiteboard
  // reoder
  //if source is Operators
  // push into selectedList
  //
  //if source is whiteboard
  // remove operator from selectedList

  onDragEnd = ev => {
    const { source, destination, dragabb } = ev
    const [ whiteBoard, operators ] = ['droppable2', 'droppable'];
    if (!destination && source.droppableId === operators) return
    //splice array if drop dest is different then whiteBoard
    if (source.droppableId === whiteBoard && (!destination || destination.droppableId !== whiteBoard) ) {
      return this.setState(prevState => ({
        selectedList : [
          ...prevState.selectedList.slice(0, source.index),
          ...prevState.selectedList.slice(source.index +1)
        ]
      }))
    }
    if (destination.droppableId === whiteBoard) {
      //return if in same position;
      if(source.droppableId === operators) {
        const localItem = { ...this.state.operatorsList[source.index] };
        localItem.id = localItem.id.concat(this.state.selectedList.length);

        return this.setState(prevState => ({
          selectedList : [
            ...prevState.selectedList.slice(0, destination.index),
            localItem,
            ...prevState.selectedList.slice(destination.index)
          ]
        }))
      }
      const draggedItem = this.state.selectedList[source.index];

      /// co
      const sortDirection = source.index > destination.index ? 'left' : 'right';
      // walk from dragged item up if left down if right;
      // check if it is ordered left, walk from source.index to destination.index, moving down each element;
      // if is ordered right, move from source.index to destination.index moving up each element;
      // left index

      // iterate over oldArray until find the drag index,  destination index, from there, sort  right
      const selectedItem = { ...this.state.selectedList[source.index] };
      selectedItem.id = selectedItem.id.concat(this.state.selectedList.length);
      if (this.state.selectedList.length > 1) {

        const divisor = sortDirection === 'right' ? source.index : destination.index;
        if (sortDirection === 'right') {
          return this.setState({ selectedList : [
            ...this.state.selectedList.slice(0, source.index),
            ...this.state.selectedList.slice(source.index+1, destination.index+1),
            selectedItem,
            ...this.state.selectedList.slice(destination.index+1)
          ]});
        }
        return this.setState({ selectedList : [
          ...this.state.selectedList.slice(0, destination.index),
          selectedItem,
          ...this.state.selectedList.slice(destination.index, source.index),
          ...this.state.selectedList.slice(source.index+1)
        ]});
      }
    }
    return

    if (source.droppableId === 'droppable') {

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
      if (index === 0) {
        concatenatedExpression = concatenatedExpression.concat(item.expression)
        return (concatenatedExpression = concatenatedExpression.concat(
          item.value
        ))
      }
      concatenatedExpression = concatenatedExpression.concat(item.value)
      concatenatedExpression = concatenatedExpression.concat(item.expression)
    })
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
      this.regexError = 'This regex executes with Error. :(';

    }
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
            <Grid item style={{ flex: '0.5 0 50%' }}>
              <Typography variant='h2' align='center' style={{marginBottom : 50}}>
                Regex Whiteboard
              </Typography>
              <>
                <WhiteBoard />
              </>
            </Grid>
            <Grid item style={{ flex: '0.1 0 10%', width: '100%' }}>
              <TextField
                label="Text To Evaluate"
                className={classes.textField}
                value={this.state.text}
                onChange={this.handleChange('text')}
                margin="dense"
                multiline={false}
                variant="outlined"
                rowsMax="2"
                rows="2"
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
              <Grid item>
                {this.regexError ?
                  <Typography variant='h4' color='error'>
                     {this.regexError}
                  </Typography>
                :
                  <>
                    <Typography variant='h4'>
                      Result - Expressive Regex
                    </Typography>
                    <Typography variant='h4' style={{color : 'green'}}>
                        {this.regexSource}
                    </Typography>
                  </>
                }
              </Grid>
              {this.state.text && this.state.flagList[2].flagged ?
                <Grid container direction='column'>
                    <Typography variant="h4">
                      Words Matching :
                    </Typography>
                  {this.state.text.split(' ').filter(e => e !== ' ').map((string, index) => (
                    <Grid item>
                      <Typography variant="h4">
                        {string.match(expression)}
                      </Typography>
                    </Grid>
                  )
                  )}
                </Grid>
              : <Typography variant="h4" component="p">
                <Typography variant="h6">
                   { this.state.text && `Matching :` }
                </Typography>
                  {this.state.text && this.state.text.match(expression)}
                </Typography>
            }
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
