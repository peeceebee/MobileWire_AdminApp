import React from "react";

const Checkbox = ({ label, name, isSelected, onCheckboxChange }) => (
  <div className="form-check">
    <label>
      {label}
    </label>
    <input
      type="checkbox"
      name={name}
      checked={isSelected}
      onChange={onCheckboxChange}
      className="form-check-input"
      style={{width: '20px'}}
    />
  </div>
);

export default Checkbox;
