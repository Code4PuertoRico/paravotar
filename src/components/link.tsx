import React, { ReactChildren } from "react"
import { Link as GatsbyLink } from "gatsby"

type Props = {
  to: string
  children: ReactChildren | string
  target?: string
}

export default function Link({ to, children, target }: Props) {
  const isExternalLink = to.includes("https")

  if (isExternalLink) {
    return (
      <a
        className="text-primary font-medium"
        href={to}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : ""}
      >
        {children}
      </a>
    )
  }

  return (
    <GatsbyLink to={to} className="text-primary font-medium">
      {children}
    </GatsbyLink>
  )
}

Link.defaultProps = {
  target: "",
}
