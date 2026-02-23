interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
}

function Select({ options, label, className, ...props }: SelectProps) {
  return (
    <span>
      <label className="text-sm text-gray-300" htmlFor={props.name}>
        {label}
      </label>
      <select
        {...props}
        id={props.name}
        className={`bg-gray-800 text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-white/20 transition appearance-none cursor-pointer ${className ?? ""}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </span>
  );
}

export default Select;
