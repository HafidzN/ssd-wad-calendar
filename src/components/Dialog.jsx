const Dialog = ({ title, date, handleDelete, handlePotalClose }) => {
    return (
        <div className="portal__wrapper">
        <h2>{title}</h2>
        <p>{date.toDateString()}</p>
        <ion-icon onClick={handleDelete} name="trash-outline"></ion-icon>
        <ion-icon onClick={handlePotalClose} name="close-outline"></ion-icon>
        </div>
    )
}

export default Dialog