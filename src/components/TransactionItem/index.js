// Write your code here
const TransactionItem = props => {
  const {details, deleteTransaction} = props
  const {id, title, amount, type} = details
  const onClickButton = () => {
    deleteTransaction(id)
  }
  return (
    <li>
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{type}</p>
      <button type="button" onClick={onClickButton} data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default TransactionItem
