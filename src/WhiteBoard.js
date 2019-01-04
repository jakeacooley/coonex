import React from 'react'
import {
  Avatar,
  Button,
  Grid,
  TextField,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Divider,
  IconButton,
  Typography,
  Chip
} from '@material-ui/core'
import Flag from '@material-ui/icons/Flag'
import OutlinedFlag from '@material-ui/icons/OutlinedFlag'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import CustomChip from './components/CustomChip'

const grid = 8

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250
})


const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  // change background colour if dragging

  // styles we need to apply on draggables
  ...draggableStyle
})


export default function() {
    const { classes, theme } = this.props
    const { open } = this.state
    return (
      <Grid container style={{minHeight : '300px'}} direction='column'>
        <Grid item >
          <Droppable droppableId="droppable2">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  backgroundColor: 'white',
                  minWidth: 300,
                  minHeight: '200px'
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
                        <Grid container direction='column' style={{
                          justifyContent: 'center',
                          alignItems: 'center',

                        }}>
                            <Chip
                              avatar={<Avatar>{item.expression}</Avatar>}
                              label={item.content}
                              clickable
                              className={classes.chip}
                              style={{
                                width: '50%',
                                minHeight: '50px',
                              }}
                              >
                              // color="primary"

                          </Chip>
                          {item.id === 'character' && (
                            <TextField
                            // label="Enter Any Character"
                            className={classes.textField}
                            value={this.state.selectedList[index].value}
                            onChange={e => {
                              e.preventDefault()
                              if (e.target.value.length > 1) return
                              const { selectedList } = this.state
                              selectedList[index].value = e.target.value
                              this.setState({ selectedList })
                            }}

                            style={{ width: 50, height : 30, border : '1px solid' }}                            // InputProps={{
                              //   inputProps: {
                                //     style: { fontSize: 12 }
                                //   }
                                // }}
                                inputProps={{
                                  style: {  color: 'black',paddingTop: '4px', textAlign : 'center' }
                                }}
                                />
                              )}
                        </Grid>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
        <Grid item container style={{padding : '5px'}} justify='center'>
          {this.state.flagList.map((flag, index) => (
            <Button
              key={flag.id}
              variant="outlined"
              size="small"
              style={{
              border: '2px solid #282c34',
              marginBottom: '15px',
              backgroundColor : '#3f51b5',
               minHeight: '60px'}}
              onClick={() => this.handleFlagClick(flag.id)}
              // className={classes.button}
            >
              <Typography component="h4">{flag.content}</Typography>
              {flag.flagged ? <Flag /> : <OutlinedFlag />}
            </Button>
          ))}
        </Grid>
        <Grid item>
          <Typography variant='h4' color={this.regexError && 'error'}>
            {this.regexError ? this.regexError : `Result - Expressive Regex : ${this.regexSource}`}
          </Typography>
        </Grid>
      </Grid>
    )
    // return (
    //       <Grid >

    //       </Grid>
    //       <Grid item >
    //         <Typography variant='h4' color='error'>
    //           {this.regexError}
    //         </Typography>
    //       </Grid>
    // )
}
