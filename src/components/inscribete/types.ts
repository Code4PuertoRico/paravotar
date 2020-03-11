export type Voter = {
  id: string
  icon: string
  description: string
  prerequisites: string[]
  shouldKnow: string[]
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
}
