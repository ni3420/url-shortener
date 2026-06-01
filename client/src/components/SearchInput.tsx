interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <label className="input input-bordered flex items-center gap-2 w-full bg-base-100 shadow-sm focus-within:input-primary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-50"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
      <input
        type="text"
        placeholder="Search links..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="grow"
      />
    </label>
  );
};

export default SearchInput;