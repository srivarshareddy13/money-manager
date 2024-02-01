import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionList: [],
  }
  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOption = event => {
    this.setState({optionId: event.target.value})
  }
  deleteTransaction = id => {
    const {transactionList} = this.state
    const updatedList = transactionList.filter(each => {
      each.id !== id
    })
    this.setState({transactionList: updatedList})
  }

  getExpenses = () => {
    const {transactionList} = this.state
    let expenseAmount = 0
    transactionList.forEach(each => {
      if (each.type === transactionTypeOptions[1].displayText) {
        expenseAmount += each.amount
      }
    })
    return expenseAmount
  }

  getBalance = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    let expenseAmount = 0
    let balanceAmont = 0

    transactionList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        incomeAmount += each.amount
      } else {
        expenseAmount += each.amount
      }
    })
    balanceAmont = incomeAmount - expenseAmount

    return balanceAmont
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    transactionList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        incomeAmount += each.amount
      }
    })

    return incomeAmount
  }
  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOfOption = transactionTypeOptions.find(each => {
      each.optionId === optionId
    })
    const {displayText} = typeOfOption

    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  render() {
    const {titleInput, amountInput, transactionList, optionId} = this.state
    const expenses = this.getExpenses()
    const balance = this.getBalance()
    const income = this.getIncome()
    return (
      <div className="app-container">
        <div className="container">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
          <div>
            <MoneyDetails
              expensesAmount={expenses}
              balanceAmount={balance}
              incomeAmount={income}
            />
          </div>
          <div>
            <form onSubmit={this.onAddTransaction}>
              <h1>Add Transaction</h1>
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                id="title"
                value={titleInput}
                onChange={this.onChangeTitle}
                placeholder="TITLE"
              />
              <label htmlFor="amount">AMOUNT</label>
              <input
                type="text"
                id="amount"
                value={amountInput}
                placeholder="AMOUNT"
                onChange={this.onChangeAmount}
              />
              <label htmlFor="type">TYPE</label>
              <select id="type" value={optionId} onChange={this.onChangeOption}>
                {transactionTypeOptions.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </form>
            <button type="submit">Add</button>
          </div>
          <div>
            <h1>History</h1>
            <ul>
              <li>
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
              </li>
              {transactionList.map(each => (
                <TransactionItem
                  key={each.id}
                  details={each}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
