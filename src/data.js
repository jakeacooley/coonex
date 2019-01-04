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
    content: 'Evaluate each word of the text separately',
    expression: 'splitter',
    flagged: false
  }
];


const getOperators = () => [
  {
    id: 'anchorStartsWith',
    content: 'starts with',
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

export default {
  getOperators,
  getFlags
}
