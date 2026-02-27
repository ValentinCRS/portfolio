import './index.css'

const Form = ({ onSubmit, children }) => {
    return (
        <form onSubmit={onSubmit} className="cyber-base-form">
            {children}
        </form>
    );
}
export default Form;