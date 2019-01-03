import React, { Component } from 'react'
import './App.css'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
// components
import Divider from '@material-ui/core/Divider'
import NavBar from './components/NavBar'
import List from '@material-ui/core/List'
import { mainListItems } from './listItems'
import Preview from './components/Preview'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import styles from './styles.js';
console.log(styles);
// styles



class App extends Component {
  state = {
    expression: '',
    text:
      'RegExr was created by gskinner.com, and is proudly hosted by Media Temple.Edit the Expression & Text to see matches. Roll over matches or the expression for details. PCRE & Javascript flavors of RegEx are supported.The side bar includes a Cheatsheet, full Reference, and Help. You can also Save & Share with the Community, and view patterns you create or favorite in My Patterns. Explore results with the Tools below. Replace & List output custom results. Details lists capture groups. Explain describes your expression in plain English.',
    evaluatedText: 'testing'
  }

  handleChange = field => async (e) => {
    e.preventDefault();
    let inputValue = e.target.value && new String(e.target.value);
    this.setState(prevState => ({
        [field]: `${inputValue}`,
    }))
    // if (toTailString) {
    //   console.log('TOTAIL STRING IS STARTING', toTailString)
    //   if (toTailString[0] === '/') toTailString = toTailString.substring(1, toTailString.length);
    //    //if last one is a / remove it;
    //    //
    //
    //   console.log('REMOVED / is ', toTailString[toTailString.length -1])
    //     toTailString = toTailString.substring(0, toTailString.length);
    //     console.log('REMOVED LAST /', toTailString)
    //   } else {
    //     const inputedValue = toTailString.substring(toTailString.length -1);
    //     toTailString = toTailString.substring(0, toTailString.length -2).concat(inputedValue);
    //     console.log('REMOVED LAST / after delete', toTailString)
    //   }
    //   console.log('aiaiaia', e.target.value)
    //   //  toTailString = totail.substring(0, totailString.length - 2) toTailString.concat(toTailString.substring[toTailString.length-1]);
    //   // console.log('INPUT VALUE SO FAR', toTailString)
    //   // tailString
    //   // console.log('TAILED STRING', tailString)
    //
    //   let inputValue = toTailString;
    //   if (!inputValue) inputValue = '';

    //   // if (inputValue.length > 2) await this.evaluateText(this.state.text, inputValue)
    // }

  }
  evaluateText = async (text, expression) => {
    // let something = RegExp(expression, 'g')
    console.log('text: ', text)
    const decomposed = new String(expression);
    this.setState(prevState => ({
      evaluatedText: prevState.text.match(prevState.expression)
    }))
    return ''
  }

  render() {
    const { classes, theme } = this.props
    // console.log(theme)
    return (
      <Grid  direction='column' container >
        <Grid item
        style={{minHeight: '70px'}}>
          <NavBar {...this.props} />
        </Grid>
        <Grid
          container
          direction='column'
          style={{
            alignItems : 'center',
            padding : '20px 20px 20px 20px',
            minHeight: '92vh'
          }}>
          {/*<List>{mainListItems}</List>*/}
            <Grid item style={{flex : '0.1 0 10%'}} >
              <Typography
              style={{ color: 'white' }}
              variant="h5"
              component="h2"
              >
                Learn Regex
              </Typography>
            </Grid>
            <Grid item style={{flex : '0.5 0 50%'}}>
              <Preview {...this.props} />
            </Grid>
            <Grid item style={{flex : '0.1 0 10%', width: '100%'}}>
              <TextField
                label="Text To Evaluate"
                className={classes.textField}
                value={this.state.expression}
                onChange={this.handleChange('expression')}
                margin="dense"
                multiline={true}
                variant="outlined"
                rowsMax="5"
                rows="5"
                style={{width : '100%'}}
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
            <Grid item style={{flex : '0.3 0 30%', width: '100%'}}>
              <Typography
                variant='h4'
                align='center'
                color='secondary'
              >
                Rsultsss
              </Typography>
              <Typography
                style={{ color: 'green' }}
                variant="h4"
                component='p'
                >
                {this.state.evaluatedText}
              </Typography>
            </Grid>
        </Grid>
      </Grid>
    )
  }
}



export default withStyles(styles)(App)
