import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Button } from '@material-ui/core';

// const CustomButton = withStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     borderRadius: 3,

//     border: 0,
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//   },
//   label: {
//     textTransform: 'capitalize',
//   },
// })(Button);

// const CustomDialog = withStyles({}, Dialog);

// const CustomDialogContent = withStyles({
//   root: {
//     margin: 0,
//     backgroundColor: 'red'
//   },
// }, DialogContent);



export default class CustomAlert extends React.Component {

  // constructor(props) {
  //   super(props);
  // }


  render() {

    const { dialogTitle, dialogSubtitle, onClose, open } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogContent>
          <DialogContentText>
            {dialogTitle + 1231231}
          </DialogContentText>
          <DialogContentText>
            {dialogSubtitle}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" autoFocus>
            好的
          </Button>
        </DialogActions>
      </Dialog>
    );
  }


}
