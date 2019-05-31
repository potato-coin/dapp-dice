import React from 'react';
import './App.css';
// import Button from '@material-ui/core/Button';
import { getOdd } from './utils';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ResultTable from './components/result-table/ResultTable';
import CustomAlert from './components/custom-alert/CustomAlert';

const styles = theme => ({
  tabsRoot: {
    background: 'rgba(85,0,106,1)',
    opacity: '0.5',
    height: 33,
    minHeight: 33
  },
  tabsIndicator: {
    backgroundColor: 'transparent',
  },
  tabRoot: {
    textTransform: 'initial',
    minHeight: 33,
    fontSize: 12,
    fontWeight: theme.typography.fontWeightRegular,
    color: '#fff',
    '&:hover': {
      color: '#FEFEFE',
      opacity: 1,
    },
    '&$tabSelected': {
      // color: 'transparent',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#FEFEFE',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
});

class App extends React.Component {

  constructor(props) {
    super(props);

    const initCompareNum = 50;
    const initAmountIn = 1;
    const initOdd = getOdd(initCompareNum)

    this.state = {
      resultTabValue: 0,
      compareNum: initCompareNum,
      amountIn: initAmountIn.toFixed(4),
      odd: initOdd.toFixed(4) + 'X',
      chance: initCompareNum - 1 + '%',
      luckyNum: 0,
      winBalance: (initOdd * initAmountIn).toFixed(4),

      cWallet: {},
      totalBalance: '0.0000 POC',
      allResultList: [],
      selfResultList: [],
      open: false,
      dialogTitle: '',
      dialogSubtitle: '',
      dialogIcon: ''
    }
  }

  componentWillMount() {
    this._getUserInfo();
  }

  componentDidMount() {
    this._refreshAmount();
    this._getAllResult();
    this.interverId = setInterval(()=> {
      this._refreshAmount();
      this._getAllResult();
      this._getMyResult();
    }, 3000);
  
  }




  render() {

    const { classes } = this.props;
    const {
      resultTabValue, cWallet, totalBalance, compareNum,
      odd, chance, winBalance, luckyNum,
      dialogTitle, dialogSubtitle, dialogIcon, open
    } = this.state;

    return (
      <div className="app">

        <div className="top">
          <div className="dapp-title">POC DICE</div>
          <p className="core-balance-amount">{cWallet.coreBalance}</p>
        </div>

        <div className="balance">
          <p className="balance-title">当前奖池总金额</p>
          <p className="balance-amount">{totalBalance}</p>
        </div>

        <div className="dice-content">

          <div className="number-group">
            <div className="basic-num number-item">
              <p className="number-title">小于该数获胜</p>
              <p className="number-amount">{compareNum}</p>
            </div>
            <div className="luckly-num number-item">
              <p className="number-title">幸运数</p>
              <p className="number-amount luckly-number-ammout">{luckyNum}</p>
            </div>
          </div>
          <div className="slider">
            <input type="range" min={2} max={96} name="points"
              value={compareNum}
              style={{background:`linear-gradient(to right, #227819, #227819 ${compareNum}%,white ${compareNum}%, white)`}}
              onChange={this._handleCompareNumChange} />
          </div>


          <div className="odds-group">
            <div className="odd-item odd">
              <p className="odd-title">赔率</p>
              <p className="odd-amount">{odd}</p>
            </div>
            <div className="odd-item">
              <p className="odd-title">中奖概率</p>
              <p className="odd-amount">{chance}</p>
            </div>
          </div>

          <div className="game-exception">
            <div className="exception-item exception-in">
              <p className="exception-label">投注金额</p>
              <input className="exception-content" type="number" value={this.state.amountIn} onChange={this._handleAmountInChange} />
            </div>
            <div className="exception-item">
              <p className="exception-label">赢取奖金</p>
              <p className="exception-content">{winBalance}</p>
            </div>
          </div>

          <div className="btn-begin" onClick={this._beginGame}>投掷骰子</div>

        </div>

        <div className="game-result">

          <div className="result-title">
            投注结果
          </div>

          <Tabs
            value={resultTabValue}
            onChange={this._handleResultTabChange}
            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
            variant="fullWidth"
          >
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="所有投注" />
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="我的投注" />
          </Tabs>

          <div className="table-container">
            {resultTabValue === 0 && <ResultTable list={this.state.allResultList} />}
            {resultTabValue === 1 && <ResultTable self={true} list={this.state.selfResultList} />}
          </div>
        </div>


        <CustomAlert
          dialogTitle={dialogTitle}
          dialogSubtitle={dialogSubtitle}
          dialogIcon={dialogIcon}
          open={open}
          onClose={this._handleClose}
        />


      </div>
    );
  }




  _handleClose = () => {
    this.setState({
      open: false,
      dialogTitle: '',
      dialogSubtitle: '',
      dialogIcon: ''
    });
  }



  _handleCompareNumChange = (event) => {

    const { amountIn } = this.state;
    const compareNum = event.target.value;

    this.setState({
      compareNum: event.target.value
    });

    const odd = getOdd(compareNum);
    this.setState({
      odd: odd.toFixed(4) + 'X',
      chance: compareNum - 1 + '%',
      winBalance: (odd * amountIn).toFixed(4)
    });
  }


  _handleAmountInChange = (event) => {
    const { compareNum } = this.state;
    const amountIn = event.target.value;
    const odd = getOdd(compareNum);
    this.setState({
      amountIn: amountIn,
      odd: odd.toFixed(4) + 'X',
      winBalance: (odd * amountIn).toFixed(4)
    })
  }

  _beginGame = () => {

    const { winBalance, totalBalance } = this.state;

    if (Number(winBalance) * 10 > Number(totalBalance.split(' ')[0])) {
      this.setState({
        open: true,
        dialogTitle: '下注失败',
        dialogSubtitle: '赢取的最大奖金必须小于当前奖池的十分之一'
      });
      return;
    }

    const { cWallet, amountIn, compareNum } = this.state;
    const args = {
      from: cWallet.cardid,
      account: 'dice2',
      name: 'bet',
      data: {
        player: cWallet.name,
        amount: Number(amountIn).toFixed(4) + ' POC',
        rollnum: compareNum,
      }
    }
    window.runAction(args, (error, result) => {

      if (error) {
        const body = error.body || { };
        return this.setState({
          open: true,
          dialogTitle: body.status,
          dialogSubtitle: body.msg
        })
      }

      if (result && result.status === 0) {
        // 下注成功
        const { block_time, act } = result.result.processed.action_traces[0].inline_traces[0].inline_traces[0];
        setTimeout(() => {
          this._getAllResult();
          this._getMyResult(block_time, act.data.memo);
        }, 3000);
      } else {
        this.setState({
          open: true,
          dialogTitle: result  && result.error_code,
          dialogSubtitle: result && result.message
        });
      }
    })
  }

  _handleResultTabChange = (event, resultTabValue) => {
    resultTabValue === 0 ? this._getAllResult() : this._getMyResult();
    this.setState({ resultTabValue });
  }

  // 获取信息
  _getAllResult() {
    var args = {
      "code": "dice2",
      "scope": "dice2",
      "table": "bet_clear",
      "reverse": true,
      "limit": 15,
      "json": true
    }

    window.getTableRows(args, (err, data) => {

      if(err) {
        return ;
      }
      
      this.setState({
        allResultList: data.rows
      })
    })
  }

  _getMyResult(block_time, memo) {

    const args = {
      code: 'dice2',
      scope: this.state.cWallet.name, // 用钱包账号名
      table: 'my_clear',
      reverse: true,
      limit: 15,
      json: true
    }

    window.getTableRows(args, (err, data) => {

      if (err) {
        return;
      }

      const rows = data.rows;

      if (memo) {
        this._refreshAmount();

        // 找寻当前记录
        let currentRow;
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];

          if (row.bet_id === memo) {
            // 找到记录
            currentRow = row;
            break;
          }
        }

        if (currentRow) {
          const { random_roll, roll_under, amount } = currentRow;

          // 还没有计算出来
          if(!random_roll) {
            return;
          }

          const amountNum = Number(amount.split(' ')[0]);
          const odd = getOdd(roll_under);

          let title, subtitle, icon;
          if (random_roll < roll_under) {
            // win
            icon = 'iconxiaolian'
            title = '恭喜你，你赢了';
            subtitle = `${random_roll} (${roll_under})  + ${(odd * amountNum).toFixed(4) + 'POC'}`
          } else {
            // fail
            icon = 'iconkulian'
            title = '很抱歉，你输了';
            subtitle = `${random_roll} (${roll_under})`;
          }

          this.setState({
            luckyNum: currentRow.random_roll,
            dialogTitle: title,
            dialogSubtitle: subtitle,
            dialogIcon: icon,
            open: true
          });
        } else {
          this.setState({
            open: true,
            dialogTitle: '没有找到相关记录'
          })
        }
      }

      this.setState({
        selfResultList: data.rows
      })

    })
  }

  _getUserInfo() {
    window.getUserInfo(null, (error, data) => {

      if (error) {
        return;
      }

      // data 用户信息
      this.userInfo = data;
    })
  }

  _refreshAmount() {
    window.getCurrentCardInfo(null, (error, data) => {

      if (error) {
        return;
      }

      this.setState({
        cWallet: data
      })
    })

    window.getCurrencyBalance({ account: 'dice2' }, (err, data) => {

      if (err) {
        return;
      }

      this.setState({
        totalBalance: data[0]
      });
    })
  }
}

export default withStyles(styles)(App);
