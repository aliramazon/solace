import React from "react";
import { ClearIcon } from "../icons";
import "./input.css";

interface InputProps {
  type?: "text" | "email" | "password";
  disabled?: boolean;
  placeholder?: string;
  clearable?: boolean;
  onChange: (value: string) => void;
  value: string;
  id?: string;
  autoFocus?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  disabled,
  placeholder,
  clearable,
  onChange,
  value,
  id,
  autoFocus,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const clearInput = () => {
    onChange("");
  };

  return (
    <div className="input-control">
      <div className="input-wrapper">
        <input
          className="input"
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          id={id}
          autoFocus={autoFocus}
        />
        {clearable && value.length > 0 && (
          <button
            className="input-clear-btn"
            onClick={clearInput}
            type="button"
          >
            <ClearIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export { Input };
