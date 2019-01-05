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

const grid = 8

const getListStyle = isDraggingOver => ({
  backgroundColor : '#282c34',
})

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  paddingTop : 10,
  paddingLeft : 5,
  paddingRight : 10,
  height: 60,
  // change background colour if dragging
  // styles we need to apply on draggables
  ...draggableStyle
})


export default function() {
    const { classes, theme } = this.props
    const { open } = this.state
    return (<Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}

      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader} style={{backgroundColor : '#3f51b5', justifyContent: 'center', height : '30px'}}>
        <Typography
          variant='h6'
        >
          Operators
        </Typography>
      </div>
      <Divider />
      {/* <DragDropContext onDragEnd={this.onDragEnd}> */}
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {this.state.operatorsList.map((item, index) => (
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
                      avatar={<Avatar style={{backgroundColor: '#282c34'}}>{item.expression}</Avatar>}
                      label={item.content}
                      clickable
                      color='primary'
                      className={classes.chip}
                      style={{
                        width: '100%',
                        minHeight: '40px',
                      }}
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
    </Drawer>
    )

}
