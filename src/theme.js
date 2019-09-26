import orange from '@material-ui/core/colors/orange'
import pink from '@material-ui/core/colors/pink'
import teal from '@material-ui/core/colors/teal'
import grey from '@material-ui/core/colors/grey'
import blue from '@material-ui/core/colors/blue'
// import { fade } from '@material-ui/core/styles/colorManipulator'

export default {
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary: blue,
    primary1Color: orange[800],
    primary2Color: grey[400],
    primary3Color: orange[100],
    accent1Color: pink['A200'],
    accent2Color: teal['A100']
  },
  field: {
    width: '100%',
    marginTop: '2rem'
    // maxWidth: '350px'
  },
  multilineField: {
    width: '100%',
    marginTop: '2rem'
    // maxWidth: '500px'
  },
  typography: {
    // Enable typography v2: https://material-ui.com/style/typography/#migration-to-typography-v2
    useNextVariants: true,
    sub: {
      color: '#757575'
    },
    h3: {
      color: '#757575',
      fontWeight: 100,
      marginBottom: '3rem'
    },
    h5: {
      color: '#757575',
      fontWeight: 400,
      marginBottom: '2rem'
    }
    // h4: {
    //   color: '#757575',
    //   fontWeight: 100
    // }
  },
  flexColumnCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
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
  },
  subHeader: {
    color: ' rgba(0, 0, 0, 0.54)',
    fontSize: '1.5rem',
    alignSelf: 'flex-start',
    marginTop: '2rem',
    marginBottom: '2rem'
  }
}
