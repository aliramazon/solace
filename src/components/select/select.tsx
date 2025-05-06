import { ChevronDown } from "../icons";
import "./select.css";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  placeholder,
  value,
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="select-wrapper">
      <select onChange={handleOnChange} className="select" value={value}>
        <option key="clear" value="">
          {placeholder}
        </option>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      <div className="select-icon">
        <ChevronDown />
      </div>
    </div>
  );
};

export { Select };
