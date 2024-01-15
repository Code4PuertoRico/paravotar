type Props = {
  options: Array<{ value: string }>
  onSelect: (selection: string) => void
  selectedOption: string | null
}

export default function Dropdown({ options, selectedOption, onSelect }: Props) {
  return (
    <select
      className="w-full p-2 border border-primary rounded"
      onChange={(option) => {
        onSelect(option.currentTarget.value)
      }}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          selected={selectedOption == option.value}
        >
          {option.value}
        </option>
      ))}
    </select>
  )
}
