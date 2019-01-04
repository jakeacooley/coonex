import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Flag from '@material-ui/icons/Flag'
import OutlinedFlag from '@material-ui/icons/OutlinedFlag'
import Preview from './components/Preview'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

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

const getFlags = () => [
  {
    id: 'flagGlobal',
    content: 'Search over the entire provided text',
    expression: 'g',
    flagged: true
  },
  {
    id: 'flagCaseInsensitive',
    content: 'Case Insensitive',
    expression: 'i',
    flagged: true
  },
  {
    id: 'flagSplitter',
    content: 'Evaluate each word of the text separately',
    expression: 'splitter',
    flagged: true
  }
]

const getItems = count => [
  {
    id: 'anchorStartsWith',
    content: 'starts with',
    expression: '^',
    value: ''
  },
  {
    id: 'anyCharacter',
    position: 'pre',
    content: 'Any Character',
    expression: '.',
    value: ''
  },
  {
    id: 'quantifierAnyNumberOfTimes',
    content: 'Any Number of Times',
    expression: '*',
    value: ''
  },
  {
    id: 'rangeOpen',
    content: 'Start Range',
    expression: '[',
    value: ''
  },
  {
    id: 'rangeClose',
    content: 'Close Range',
    expression: ']',
    value: ''
  },
  {
    id: 'anchorEndsWith',
    content: 'ends with',
    expression: '$',
    value: ''
  }
]

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

const grid = 8

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

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250
})

class App extends React.Component {
  state = {
    open: false,
    draggableList: getItems(5),
    flagList: getFlags(),
    selectedList: []
  }

  id2List = {
    droppable: 'draggableList',
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
        draggableList: result.droppable,
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
    } catch (err) {
      expression = ''
    }
    console.log('EXPRESSION IS', expression)
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Persistent drawer
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'ltr' ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            {/* <DragDropContext onDragEnd={this.onDragEnd}> */}
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.draggableList.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <Chip
                            avatar={<Avatar>{item.expression}</Avatar>}
                            label={item.content}
                            clickable
                            className={classes.chip}
                            // color="primary"
                            // onDelete={handleDelete}
                            // deleteIcon={<DoneIcon />}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {this.state.flagList.map((flag, index) => (
              <Button
                key={flag.id}
                variant="outlined"
                size="small"
                onClick={() => this.handleFlagClick(flag.id)}
                // className={classes.button}
              >
                <Typography component="h4">{flag.content}</Typography>
                {flag.flagged ? <Flag /> : <OutlinedFlag />}
              </Button>
            ))}
            {/* </DragDropContext> */}
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open
            })}
          >
            <div className={classes.drawerHeader} />
            <Grid item style={{ flex: '0.1 0 10%' }}>
              <Typography
                style={{ color: 'white' }}
                variant="h5"
                component="h2"
              >
                Learn Regex
              </Typography>
            </Grid>
            <Grid item style={{ flex: '0.5 0 50%' }}>
              {/* <Preview {...this.props} /> */}
              {/* <DragDropContext onDragEnd={this.onDragEnd2}> */}
              <Droppable droppableId="droppable2">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={{
                      backgroundColor: 'white',
                      width: 300,
                      height: 300
                    }}
                  >
                    {this.state.selectedList.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <Chip
                              avatar={<Avatar>{item.expression}</Avatar>}
                              label={item.content}
                              clickable
                              className={classes.chip}
                              // color="primary"
                              // onDelete={handleDelete}
                              // deleteIcon={<DoneIcon />}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              {/* </DragDropContext> */}
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
