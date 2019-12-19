import React from "react";
import { useService } from "@xstate/react";
import { PartyActor, Party } from "../types";

interface PartyHeaderProps {
  partiesRef: PartyActor;
}

export const PartyHeader: React.FunctionComponent<PartyHeaderProps> = ({
  partiesRef
}) => {
  const [current, send] = useService(partiesRef);

  const { parties, selectedParty } = current.context;

  const isSelected = (party: Party) => selectedParty && selectedParty.id === party.id;

  const handleChange = (party: Party) => () => {
    if (current.value === "selected") {
      send("unselect", { selected: party });
    } else {
      send("selection", { selected: party });
    }
  };

  return (
    <>
      <thead>
        <tr>
          <td>Party: {current.value}</td>
        </tr>
        <tr>
          {parties.map(p => (
            <th key={p.id}>
              <p>{p.description}</p>
              <input
                type="checkbox"
                checked={isSelected(p)}
                onChange={handleChange(p)}
              />
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};
