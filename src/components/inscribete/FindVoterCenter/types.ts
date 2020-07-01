export interface FindYourCenterContext {
  voterId?: string
}

export type FindYourCenterEvent = { type: "submit"; voterId: string }
