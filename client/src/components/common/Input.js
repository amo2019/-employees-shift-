import React from "react";

const Input = ({ label, value, onChange, onKeyDown, placeholder }, ref) => {
  const inputStyle = {
    color: "#000",
    padding: 10,
    fontSize: 18,
    //lineHeight: 23,
    flex: 2,
  };

  const labelStyle = {
    fontSize: 18,
    padding: 10,
    flex: 1,
  };

  const containerStyle = {
    //height: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>{label}</label>
      <input
        // secureTextEntry={secureTextEntry}
        onKeyDown={onKeyDown}
        ref={ref}
        placeholder={placeholder}
        style={inputStyle}
        value={value}
        onChange={onChange}
      />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {/* {touched && error} */}
      </div>
    </div>
  );
};

const forwardRef = React.forwardRef(Input);

export { forwardRef as Input };
