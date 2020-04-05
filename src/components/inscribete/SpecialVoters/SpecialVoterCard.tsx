import React from "react"
import Dropdown from "react-dropdown-aria"

import Download from "../../../assets/icons/download.inline.svg"
import List from "../../../assets/icons/list.inline.svg"
import Typography from "../../typography"
import Button from "../../button"
import Link from "../../link"

type Props = {
  icon: string
  title: string
  summary: string
  deadline: string
  documents: Array<{ title: string; link: string }>
  onClickRequirements: () => void
  onClickDownload?: () => void
}

const style: { [key: string]: any } = {
  DropdownButton: (base: any, { open }: any) => ({
    ...base,
    backgroundColor: "#886944",
    marginTop: 12,
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

export default function SpecialVoterCard(voter: Props) {
  return (
    <div className="flex flex-col flex-shrink-0 justify-start w-full rounded shadow-md p-6 bg-white mx-0 my-2 relative text-center lg:flex-1 md:m-2">
      <img className="w-12 h-auto m-auto" src={voter.icon} alt="" />
      <Typography tag="h4" variant="h4" className="mt-4 uppercase">
        {voter.title}
      </Typography>
      <Typography tag="p" variant="p" className="mt-3">
        {voter.summary}
      </Typography>
      <Typography tag="p" variant="h4" className="mt-3">
        <span className="text-primary">
          Fecha límite <time>{voter.deadline}</time>
        </span>
      </Typography>
      <Button
        variant="inverse"
        className="mt-6"
        onClick={voter.onClickRequirements}
      >
        <List className="mr-1 h-5 w-5 inline-block" /> Aquí los requisitos
      </Button>

      {voter.documents.length > 1 && voter.onClickDownload ? (
        <Dropdown
          id="dropdown"
          placeholder="Escoge la solicitud a descargar"
          searchable={false}
          options={voter.documents.map(document => ({ value: document.title }))}
          setSelected={(docTitle: string) => {
            const document = voter.documents.find(doc => doc.title === docTitle)

            // Open download in a new tab.
            window.open(document?.link, "_blank")
          }}
          buttonClassName="text-white text-sm"
          centerText={true}
          style={style}
        />
      ) : (
        <Link
          to={voter.documents[0].link}
          target="_blank"
          variant="primary"
          className="mt-4"
        >
          <Download className="mr-1 h-5 w-5 inline-block" /> Descarga la
          solicitud
        </Link>
      )}
    </div>
  )
}
