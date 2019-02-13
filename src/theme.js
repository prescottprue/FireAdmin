import orange from '@material-ui/core/colors/orange'
import pink from '@material-ui/core/colors/pink'
import teal from '@material-ui/core/colors/teal'
import grey from '@material-ui/core/colors/grey'
import blue from '@material-ui/core/colors/blue'
// import { fade } from '@material-ui/core/styles/colorManipulator'
import spacing from '@material-ui/core/styles/spacing'
import zIndex from '@material-ui/core/styles/zIndex'

export default {
  // Enable typography v2: https://material-ui.com/style/typography/#migration-to-typography-v2
  typography: {
    useNextVariants: true
  },
  spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary: blue,
    primary1Color: orange[800],
    primary2Color: grey[400],
    primary3Color: orange[100],
    accent1Color: pink['A200'],
    accent2Color: teal['A100']
  },
  flexColumnCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  flexRowCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  pageHeader: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '2.25rem',
    alignSelf: 'flex-start',
    marginBottom: '2rem'
  }
}
