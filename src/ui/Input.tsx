type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function Input({ className, label, ...props }: InputProps) {
  return (
    <div className="w-full">
      <label className="text-sm text-gray-300" htmlFor={props.name}>
        {label}
      </label>
      <div className="w-full relative flex items-center">
        <svg
          className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          {...props}
          id={props.name}
          className={`w-full bg-gray-800 text-white text-sm placeholder-gray-500 rounded-lg pl-9 pr-3 py-2 outline-none focus:ring-1 focus:ring-white/20 transition ${className ?? ""}`}
        />
      </div>
    </div>
  );
}

export default Input;
