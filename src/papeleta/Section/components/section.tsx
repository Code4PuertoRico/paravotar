import { useActor } from "@xstate/react"
import { SectionActor } from "../types"
import { Candidate } from "../../types"

interface SectionProps {
  sectionRef: SectionActor
}

export const Section = ({ sectionRef }: SectionProps) => {
  const [current, send] = useActor(sectionRef)

  const { section, selectedCandidates } = current.context
  const { name, rows } = section

  const isSelected = (candidate: Candidate) =>
    selectedCandidates.some((c) => c.id === candidate.id)

  const handleChange = (candidate: Candidate) => () => {
    if (current.value === "complete") {
      send("unselect", { selected: candidate })
    } else {
      send("selection", { selected: candidate })
    }
  }

  return (
    <>
      <tr>
        <td>Section: {current.value as string}</td>
      </tr>
      <tr>
        {new Array(section.maxColumns).fill(0).map((_, idx) => (
          <td key={idx} style={{ backgroundColor: "lightgrey" }}>
            <strong>{name}</strong>
          </td>
        ))}
      </tr>
      {rows.map((items, idx) => {
        const filledItems: any[] = [...items]

        if (filledItems.length < section.maxColumns) {
          let diff = section.maxColumns - filledItems.length

          while (diff > 0) {
            filledItems.push(null)
            diff -= 1
          }
        }
        return (
          <tr key={idx}>
            {filledItems.map((i, idx) =>
              i ? (
                <td
                  key={idx}
                  style={{
                    backgroundColor: isSelected(i) ? "lightgreen" : undefined,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isSelected(i)}
                    onChange={handleChange(i)}
                  />
                  {i.name}
                </td>
              ) : (
                <td key={idx} />
              )
            )}
          </tr>
        )
      })}
    </>
  )
}
