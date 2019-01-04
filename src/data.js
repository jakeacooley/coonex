const getFlags = () => [
  {
    id: 'flagGlobal',
    content: 'Global Flag',
    expression: 'g',
    flagged: true
  },

  {
    id: 'flagCaseInsensitive',
    content: 'Case Insensitive',
    expression: 'i',
    flagged: false
  },
  {
    id: 'flagSplitter',
    content: 'Split Text into Words',
    expression: 'splitter',
    flagged: false
  },
];


const getOperators = () => [
  {
    id: 'anchorStartsWith',
    content: 'Starts With',
    expression: '^',
    value: ''
  },
  {

    id: 'character',
    content: 'Character',
    expression: '',
    value: ''
  },
  {
    id : 'anyCharacterAll',
    content : 'Any Character',
    expression: '\\w',
    value : ''
  },
  {
    id: 'anyCharacter',
    position: 'pre',
    content: 'Any Character (Not Digit)',
    expression: '.',
    value: ''
  },
  {
    id: 'anyNumber',
    position: 'pre',
    content: 'Any Digit',
    expression: '\\d',
    value: ''
  },
  {
    id: 'quantifierAnyNumberOfTimes',
    content: '0 Or More Times ',
    expression: '*',
    value: ''
  },
  {
    id: 'quantifierOneOrMoreNumberOfTimes',
    content: '1 Or More Times ',
    expression: '+',
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
    pre: 'true',
    value: ''
  }
]

export default {
  getOperators,
  getFlags
}
