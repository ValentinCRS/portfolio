import './index.css'

const FormInput = ({ type, value, onChange, name, placeholder, required }) => {
    return (
        <div className="cyber-form-input-group">
            <input
                type={type}
                value={value}
                onChange={onChange}
                name={name}
                placeholder={placeholder}
                required={required}
                className="cyber-input-field"
            />
        </div>
    );
}
export default FormInput;