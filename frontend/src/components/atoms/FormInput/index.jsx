const FormInput = ({ label, type, value, onChange, name, placeholder, required }) => {
    return (
        <div className="form-input">
            <label>{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                name={name}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
}
export default FormInput;