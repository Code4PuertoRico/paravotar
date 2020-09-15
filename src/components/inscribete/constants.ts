import EighteenPlus from "../../assets/icons/eighteen-plus.svg"
import BornInTerritory from "../../assets/icons/born-in-territory.svg"
import BornInOtherCountries from "../../assets/icons/born-in-other-countries.svg"
import AbsenteeVoterIcon from "../../assets/icons/absentee-voter.svg"
import EarlyVoterIcon from "../../assets/icons/early-voter.svg"
import { Voter, SpecialVoter, AbsenteeAndEarlyVoting } from "./types"

export const VoterDocs: Voter[] = [
  {
    id: "eighteen-plus",
    icon: EighteenPlus,
    description: "Puerto Rico",
    shouldKnow: [
      "site.complete-name",
      "site.postal-address",
      "site.physical-address",
      "site.phone-number",
      "site.ss-number",
      "site.voter-height",
    ],
    recommendedDocsText: "site.rec-docs",
    recommendedDocs: ["site.rec-docs1", "site.rec-docs2"],
    requiredDocsText: "site.req-docs",
    requiredDocs: ["site.none"],
    optionalDocs: ["site.optional-docs1"],
    srText: "personas nacidas en Puerto Rico",
  },
  {
    id: "born-in-territory",
    icon: BornInTerritory,
    description: "site.born-in-territory",
    shouldKnow: [
      "site.complete-name",
      "site.postal-address",
      "site.physical-address",
      "site.phone-number",
      "site.voter-height",
    ],
    recommendedDocsText: "site.rec-docs-short",
    recommendedDocs: ["site.rec-docs1"],
    requiredDocsText: "Debes llevar uno de los siguientes documentos:",
    requiredDocs: ["site.req-docs1", "site.req-docs2"],
    optionalDocs: ["site.optional-docs1"],
    srText:
      "personas nacidas en Estados Unidos, incluyendo cualquiera de sus territorios continentales o posesiones.",
  },
  {
    id: "born-in-other-countries",
    icon: BornInOtherCountries,
    description: "site.born-in-other-countries",
    shouldKnow: [
      "site.complete-name",
      "site.postal-address",
      "site.physical-address",
      "site.phone-number",
      "site.voter-height",
    ],
    recommendedDocsText: "site.rec-docs-short",
    recommendedDocs: ["site.rec-docs1"],
    requiredDocsText: "Debes llevar uno de los siguientes documentos:",
    requiredDocs: ["site.req-docs1", "site.req-docs3", "site.req-docs4"],
    optionalDocs: ["site.optional-docs1"],
    srText:
      "personas nacidas en un país extranjero y que residen en Puerto Rico.",
  },
]

const AbsenteeVoterReasons: AbsenteeAndEarlyVoting[] = [
  {
    summary: "absentee-voter.reason-summary-01",
    details: "absentee-voter.reason-detail-01",
  },
  {
    summary: "absentee-voter.reason-summary-02",
    details: "absentee-voter.reason-detail-02",
  },
  {
    summary: "absentee-voter.reason-summary-03",
    details: "absentee-voter.reason-detail-03",
  },
  {
    summary: "absentee-voter.reason-summary-04",
    details: "absentee-voter.reason-detail-04",
  },
  {
    summary: "absentee-voter.reason-summary-05",
    details: "absentee-voter.reason-detail-05",
  },
  {
    summary: "absentee-voter.reason-summary-06",
    details: "absentee-voter.reason-detail-06",
  },
  {
    summary: "absentee-voter.reason-summary-07",
    details: "absentee-voter.reason-detail-07",
  },
  {
    summary: "absentee-voter.reason-summary-08",
    details: "absentee-voter.reason-detail-08",
  },
  {
    summary: "absentee-voter.reason-summary-09",
    details: "absentee-voter.reason-detail-09",
  },
  {
    summary: "absentee-voter.reason-summary-10",
    details: "absentee-voter.reason-detail-10",
  },
]

const EarlyVoterReasons: AbsenteeAndEarlyVoting[] = [
  {
    summary: "early-voter.reason-summary-01",
    details: "early-voter.reason-detail-01",
  },
  {
    summary: "early-voter.reason-summary-02",
    details: "early-voter.reason-detail-02",
  },
  {
    summary: "early-voter.reason-summary-03",
    details: "early-voter.reason-detail-03",
  },
  {
    summary: "early-voter.reason-summary-04",
    details: "early-voter.reason-detail-04",
  },
  {
    summary: "early-voter.reason-summary-05",
    details: "early-voter.reason-detail-05",
  },
  {
    summary: "early-voter.reason-summary-06",
    details: "early-voter.reason-detail-06",
  },
  {
    summary: "early-voter.reason-summary-07",
    details: "early-voter.reason-detail-07",
  },
  {
    summary: "early-voter.reason-summary-08",
    details: "early-voter.reason-detail-08",
  },
  {
    summary: "early-voter.reason-summary-09",
    details: "early-voter.reason-detail-09",
  },
  {
    summary: "early-voter.reason-summary-10",
    details: "early-voter.reason-detail-10",
  },
]

export const AbsenteeVoter: SpecialVoter = {
  icon: AbsenteeVoterIcon,
  summary: "site.absentee-voter-summary",
  documents: [
    {
      title: "Voto Ausente",
      link:
        "http://ww2.ceepur.org/sites/ComisionEE/es-pr/EducacionyAdiestramiento/Solicitudes/Solicitud%20Voto%20Ausente%20Elecciones%20Generales%20y%20Plebiscito%202020.pdf",
    },
  ],
  deadline: "site.absentee-deadline",
  reasons: AbsenteeVoterReasons,
  exceptions: "site.absentee-voter-exceptions",
}

export const EarlyVoter: SpecialVoter = {
  icon: EarlyVoterIcon,
  summary: "site.early-voter-summary",
  documents: [
    {
      title: "site.absentee-voter-dropdown-01",
      link:
        "http://ww2.ceepur.org/sites/ComisionEE/es-pr/EducacionyAdiestramiento/Solicitudes/Solicitud%20de%20Voto%20Adelantado%20y%20Voto%20en%20el%20Domicilio.pdf",
    },
    {
      title: "site.absentee-voter-dropdown-04",
      link:
        "http://www.ceepur.org/Elecciones/docs/Request%20for%20Early%20Vote%20General%20Elections%20and%20Plebiscite%202020.pdf",
    },
  ],
  deadline: "site.early-deadline",
  reasons: EarlyVoterReasons,
  exceptions: "site.early-voter-exceptions",
}
