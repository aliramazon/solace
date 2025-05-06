import "./checkbox.css";

interface CheckboxProps {
  checked: boolean;
  value?: string;
  onChange: (checked: boolean, value?: string) => void;
  label?: string;
  id: string;
  disabled?: boolean;
}
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  value,
  onChange,
  label,
  id,
  disabled,
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked, e.target.value);
  };

  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        checked={checked}
        className="checkbox"
        id={id}
        onChange={handleOnChange}
        value={value}
        disabled={disabled}
      />
      {label && (
        <label htmlFor={id} className="checkbox__label">
          {label}
        </label>
      )}
    </div>
  );
};
