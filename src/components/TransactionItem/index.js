// Write your code here
import './index.css'

const TransactionItem = props => {
  const {details, deleteTransaction} = props
  const {id, title, amount, type} = details
  const onClickButton = () => {
    deleteTransaction(id)
  }
  return (
    <li className="table-row">
      <p className="transaction-text">{title}</p>
      <p className="transaction-text">Rs {amount}</p>
      <p className="transaction-text">{type}</p>
      <div className="delete-container">
        <button
          type="button"
          onClick={onClickButton}
          data-testid="delete"
          className="delete-button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}
export default TransactionItem
