import './index.css'

const FormLabel = ({ htmlFor, children }) => {
    return (
        <label htmlFor={htmlFor} className="cyber-form-label">
            <span className="sys-prompt">_&gt;</span> {children}
        </label>
    );
}
export default FormLabel;