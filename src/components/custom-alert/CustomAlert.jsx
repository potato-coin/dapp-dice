import React from 'react';

// import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
// import { withStyles } from '@material-ui/core/styles';
import './CustomAlert.css';



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

    const { dialogTitle, dialogSubtitle,
      dialogIcon,
       onClose, open } = this.props;
    return (
      <Modal
        open={open}
        onClose={onClose}
      >
        <div className="paper">
          <div className="paper-content">
            <p className="title"> <span className={`iconfont dialog-icon ${dialogIcon}`} ></span>  { dialogTitle } </p>
            <p className="subtitle">{ dialogSubtitle}</p>
          </div>
          
    
          <div className="paper-bottom" onClick={onClose}>
            好的
          </div>
        </div>
      </Modal>
    );
  }


}
