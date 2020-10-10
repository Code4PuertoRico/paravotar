export const BallotPositions = {
  state: {
    governors: {
      start: 2,
    },
    commissionerResident: {
      start: 4,
    },
  },
  municipal: {
    mayors: {
      start: 2,
    },
    municipalLegislators: {
      start: 4,
    },
  },
  legislative: {
    districtRepresentatives: {
      start: 2,
    },
    districtSenators: {
      start: 4,
      end: 6,
    },
    atLargeRepresentatives: {
      start: 7,
      end: 13,
    },
    atLargeSenators: {
      start: 14,
    },
  },
}

export const ValidMarkLimits = {
  state: {
    governors: 1,
    commissionerResident: 1,
  },
  municipal: {
    mayors: 1,
    municipalLegislators: {
      start: 4,
    },
  },
  legislative: {
    districtRepresentatives: 1,
    districtSenators: 1,
    atLargeRepresentatives: 1,
    atLargeSenators: 1,
  },
}
