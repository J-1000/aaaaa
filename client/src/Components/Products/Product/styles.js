import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
    // border: '3px solid gold',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    // border: '3px solid gold',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    // border: '3px solid gold',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    // border: '3px solid gold',
    // backgroundColor: '#ff0000',
  },
}));