import './ResultTable.css';
import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getOdd } from '../../utils.js'

import { withStyles } from '@material-ui/core/styles';

const CustomTableCell = withStyles(theme => ({
  head: {
    fontSize: 12,
    color: 'rgba(254,254,254,1)',
    // lineHeight: 33,
    border: 'none',
    paddingLeft: 12,
    paddingRight: 12
  },
  body: {
    fontSize: 12,
    color: 'rgba(254,254,254,1)',
    // lineHeight: 33,
    border: 'none',
    paddingLeft: 12,
    paddingRight: 12
  },
}))(TableCell);


const styles = theme => ({
  // root: {
  //   width: '100%',
  //   marginTop: theme.spacing.unit * 3,
  //   overflowX: 'auto',
  // },
  // table: {
  //   minWidth: 700,
  // },
  headerRow: {
    background: 'rgba(68,22,71,1)',
    opacity: '0.5'
  },
  row: {
    // '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.background.default,
    
    // },
    border: 'none',
    minHeight: 33,
    height: 33,
    background: 'rgba(63,21,73,1)'
  },
});

class ResultTable extends React.Component {

  render() {

    const { classes, list, self } = this.props;
    return (
      <Table className="table">
      <TableHead>
        <TableRow className={classes.headerRow}>
          { !self && (<CustomTableCell align="center">姓名</CustomTableCell>) }
          <CustomTableCell align="center">倍数</CustomTableCell>
          <CustomTableCell align="center">金额</CustomTableCell>
          <CustomTableCell align="center">结果</CustomTableCell>
          <CustomTableCell align="center">获奖</CustomTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {list.map(row => {

            const amount =  Number(row.amount.split(' ')[0]);
            const odd = getOdd(row.roll_under, amount);
          
            return (
              <TableRow key={row.id} className={classes.row} >
                {  !self && (<CustomTableCell align="left">{row.player}</CustomTableCell>) }
                <CustomTableCell align="center">{ odd.toFixed(4)+'X' }</CustomTableCell>
                <CustomTableCell align="center">{row.amount}</CustomTableCell>
                <CustomTableCell align="center">{ row.random_roll } ({row.roll_under})</CustomTableCell>
                <CustomTableCell align="center">{ (row.random_roll < row.roll_under) ? (amount * odd).toFixed(4) + ' POC': '-' }</CustomTableCell>
              </TableRow>
            )
          }
        )}
      </TableBody>
    </Table>
    );
  }
}

export default withStyles(styles)(ResultTable)