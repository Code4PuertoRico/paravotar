import { useMemo, useState, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import { useTranslation } from "react-i18next";

import { LetterList } from "./LetterList";
import { TownList } from "./TownList";
import { voterCenters } from "./constants";
// import { AvailableCentersDirectory } from "../MakeAppointment/constants"
import { CenterInfo } from "./CenterInfo";
import Typography from "../../typography";
import Dropdown from "../../button-dropdown";

const dropdownOptions = voterCenters.map(({ pueblo }) => ({
  value: `${pueblo} (Isla)`,
}));

export function VoterCenters() {
  const { t } = useTranslation();
  const [selectedLetter, setSelectedLetter] = useState("A");

  const townList = useMemo(
    () =>
      voterCenters.filter(({ pueblo }) => pueblo.startsWith(selectedLetter)),
    [selectedLetter]
  );

  const [selectedTown, setSelectedTown] = useState(townList[0]);

  useEffect(() => {
    setSelectedTown(townList[0]);
  }, [selectedLetter, townList]);

  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver });
  const props = useSpring({
    height: bounds.height || "auto",
  });

  return (
    <>
      <Typography
        tag="h2"
        variant="h3"
        className="uppercase text-center tracking-wide"
      >
        {t("site.where-voter-card")}
      </Typography>
      <Typography
        tag="h3"
        variant="h2"
        weight="base"
        className="text-center mt-3"
      >
        {t("site.where-voter-card-guide")}
      </Typography>
      <div className="mt-12 bg-white shadow-md rounded">
        <section>
          <div className="md:hidden">
            <Dropdown
              options={dropdownOptions}
              selectedOption={`${selectedTown.pueblo} (Isla)`}
              onSelect={(t: string) => {
                const selection = t.replace(" (Isla)", "");

                setSelectedTown(
                  voterCenters.filter(({ pueblo }) => pueblo === selection)[0]
                );
              }}
            />
            <CenterInfo key={selectedTown.pueblo} town={selectedTown} />
          </div>
          <div className="hidden md:block">
            <LetterList onSelect={setSelectedLetter} letter={selectedLetter} />
            <animated.div
              className="overflow-hidden"
              style={{ height: props.height }}
            >
              <div
                className="border-t border-separator lg:flex lg:p-10"
                ref={ref}
                style={{ maxHeight: 500 }}
              >
                <TownList
                  townList={townList}
                  onSelect={setSelectedTown}
                  town={selectedTown}
                />
                <CenterInfo key={selectedTown.pueblo} town={selectedTown} />
              </div>
            </animated.div>
          </div>
        </section>
      </div>
    </>
  );
}
