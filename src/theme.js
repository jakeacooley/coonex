import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { fade } from '@material-ui/core/styles/colorManipulator';

const defaultTheme = createMuiTheme({
  palette: {
    divs : {
     // default background for divisors (gray)
      defaultBackground : '#333',
      navBarBackground : '#333',
      //dark background - some screens
      darkBackground : 'black',
      greenBackground: '#357a38'
    },
    customizable : {
      catalogo : {
        price : {
          color : 'red'
        },
        title : {
          color:'#ff9524'
        }
      }
    },
    primary: {
      light:  '#3f51b5',
      main: '#3f51b5',
      dark:  '#282c34',
      contrastText : '#fff8e1'
    },
    secondary: {
      light:  '#fff',
      main: '#000',
      dark:  `${fade('#000', 0.5)}`,
      contrastText : '#ff9524'
    },
    error: red,
    background: {
      default: "#282c34",
      paper: "#3f51b5",
      toolbar: '#000',
      button : red['A200']
    },
    text : {
      primary : '#fff8e1',
      secondary :  '#000',
    }
  },
  //mixins - ccustom objects, inspecct component implementation to be aware of more of
  mixins : {
    toolbar : {
      minHeight : 34,
      '@media (min-width:0px)': {
        minHeight : 34
      },
      '@media (min-width:600px)': {
        minHeight: 52
      },
      '@media (min-width:1020px)': {
        minHeight: 64
      }
    }
  },
  //fonts (typography element)
  typography: {
    useNextVariants: true,
    fontFamily : 'Poppins',
    fontSize : 18,
  },
});

const coef = 0.1;
const modifyRem = (value, coef) => {
  return `${parseFloat(value) * (1 + coef)}rem`;
};
Object.keys(defaultTheme.typography).forEach((variantName) => {
  const variant = defaultTheme.typography[variantName];
  if (typeof variant !== 'object') return variant;
  defaultTheme.typography[variantName] = {
    ...variant,
    [defaultTheme.breakpoints.up('xs')]: {
      fontSize: modifyRem(variant.fontSize, -coef *  2.5),
    },
    [defaultTheme.breakpoints.up('sm')]: {
      fontSize: modifyRem(variant.fontSize, -coef *  2),
    },
    [defaultTheme.breakpoints.up('md')]: {
      fontSize: modifyRem(variant.fontSize, -coef * 1.5),
    },
    [defaultTheme.breakpoints.up('lg')]: {
      fontSize: modifyRem(variant.fontSize, -coef * 0.3),
    },
    [defaultTheme.breakpoints.up('xl')]: {
      fontSize: modifyRem(variant.fontSize, coef),
    },
  };
});

export default defaultTheme
