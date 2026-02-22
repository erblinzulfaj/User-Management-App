interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="Search by name or email..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "10px",
        width: "100%",
        maxWidth: "400px",
        marginBottom: "20px",
        borderRadius: "8px",
        border: "1px solid #ccc"
      }}
    />
  );
};

export default SearchBar; // ✅ DEFAULT EXPORT
