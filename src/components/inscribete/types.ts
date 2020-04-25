export type Voter = {
  id: string
  icon: string
  description: string
  shouldKnow: string[]
  recommendedDocsText?: string
  recommendedDocs: string[]
  requiredDocsText: string
  requiredDocs: string[]
  optionalDocs: string[]
  srText: string
}

export type Town = {
  pueblo: string
  telefono?: string
  direccion?: string
  googleMapsLink?: string
  locations?: Town[]
  servicios?: string[]
  JIPIsla?: boolean
}

export type AbsenteeAndEarlyVoting = {
  summary: string
  details: string
}

export type SpecialVoter = {
  icon: string
  summary: string
  deadline: string
  documents: Array<{
    title: string
    link: string
  }>
  reasons: AbsenteeAndEarlyVoting[]
  exceptions?: string
}
