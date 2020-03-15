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
