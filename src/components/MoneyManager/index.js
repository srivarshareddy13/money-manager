import {Component} from 'react'
import {v4} from 'uuid'

import TransactionItem from '../TransactionItem'
import './index.css'

const categoryTypeOptions = [
  {
    optionId: 'FOOD',
    displayText: 'Food',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Enterainment',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'SHOPPING',
    displayText: 'Shopping',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    dateInput: '',
    optionId: categoryTypeOptions[0].optionId,
    transactionList: [],
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOption = event => {
    this.setState({optionId: event.target.value})
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updatedList = transactionList.filter(each => each.id !== id)
    this.setState({transactionList: updatedList})
  }
  

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId, dateInput} = this.state
    const typeOfOption = categoryTypeOptions.find(
      each => each.optionId === optionId,
    )
    const {displayText} = typeOfOption

    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      date: dateInput,
      type: displayText,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      dateInput: '',
      optionId: categoryTypeOptions[0].optionId,
    }))
  }

  render() {
    const {titleInput, amountInput, transactionList, optionId, dateInput} =
      this.state
    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="transaction-details">
            <form onSubmit={this.onAddTransaction} className="transaction-form">
              <h1 className="transaction-header">Add Expenses</h1>
              <label htmlFor="title" className="input-label">
                DESCRIPTION
              </label>
              <input
                type="text"
                id="title"
                value={titleInput}
                onChange={this.onChangeTitle}
                placeholder="description"
                className="input"
              />
              <label htmlFor="amount" className="input-label">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                value={amountInput}
                placeholder="AMOUNT"
                className="input"
                onChange={this.onChangeAmount}
              />
              <label htmlFor="date" className="input-label">
                DATE
              </label>
              <input
                type="date"
                className="input"
                id="date"
                placeholder="date"
                onChange={this.onChangeDate}
                value={dateInput}
              />
              <label htmlFor="select" className="input-label">
                CATEGORY
              </label>
              <select
                id="select"
                value={optionId}
                onChange={this.onChangeOption}
                className="input"
              >
                {categoryTypeOptions.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="button">
                {' '}
                Add
              </button>
            </form>
            <div className="history-transactions">
              <h1 className="transaction-header">History</h1>
              <div className="transaction-table-container">
                <ul className="transaction-table">
                  <li className="table-header">
                    <p className="table-header-cell">Title</p>
                    <p className="table-header-cell">Amount</p>
                    <p className="table-header-cell">Type</p>
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
        </div>
      </div>
    )
  }
}

export default MoneyManager
