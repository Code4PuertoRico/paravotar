import React from "react"
import Dropdown from "react-dropdown-aria"

const style: { [key: string]: any } = {
  DropdownButton: (base: any, { open }: any) => ({
    ...base,
    backgroundColor: "#886944",
    marginTop: 24,
    paddingTop: 5,
    paddingBottom: 5,
    border: 0,
    borderRadius: 4,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    borderColor: open ? "#292936" : "#cacad9",
    "&:hover": {
      borderColor: open ? "#292936" : "#cacad9",
    },

    "&:focus": {
      borderColor: open ? "#292936" : "#cacad9",
    },
  }),
  OptionContainer: (base: any) => ({
    ...base,
    marginTop: 8,
    backgroundColor: "white",
    borderColor: "#cacad9",
    borderWidth: 1,
    borderRadius: 4,
    boxShadow: "0px 3px 10px #cacad9",
  }),
  OptionItem: (base: any) => {
    return {
      ...base,
      backgroundColor: "white",
      color: "#292936",
      paddingTop: 8,
      paddingBottom: 8,
      "&:hover": {
        backgroundColor: "#ebebff",
      },
    }
  },
  Arrow: (base: any) => {
    return {
      ...base,
      borderTopColor: "#FFFFFF",
    }
  },
  DisplayedValue: (base: any) => {
    return {
      ...base,
      color: "#FFFFFF",
      fontSize: ".875rem",
    }
  },
}

type Props = {
  placeholder: string
  options: Array<{ value: string }>
  onSelect: (selection: string) => void
}

export default function ButtonDropdown(props: Props) {
  return (
    <Dropdown
      id="dropdown"
      placeholder={props.placeholder}
      searchable={false}
      options={props.options}
      setSelected={props.onSelect}
      centerText={true}
      style={style}
    />
  )
}
