const Form = ({ onSubmit, children }) => {
    return (
        <form onSubmit={onSubmit} className="form">
            {children}
        </form>
    );
}
export default Form;