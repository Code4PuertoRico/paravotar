import React, { ReactNode } from "react"
import { Link as GatsbyLink } from "gatsby"

type Props = {
  variant: "primary" | "inverse" | "link"
  to: string
  children: ReactNode | string
  target?: string
  className: string
}

export default function Link({
  to,
  children,
  target,
  variant,
  className,
}: Props) {
  const isExternalLink =
    to.includes("https") || to.includes("tel") || to.includes("http")
  const style =
    variant === "link"
      ? "text-primary font-medium"
      : variant === "inverse"
      ? "flex align-center justify-center rounded border border-primary bg-transparent text-primary font-bold py-1 px-4 text-sm hover:bg-primary-hover hover:text-white active:text-white-active active:bg-primary-active"
      : "flex align-center justify-center rounded border border-primary bg-primary text-white py-1 font-bold px-4 text-sm hover:bg-primary-hover hover:text-white active:text-white-active active:bg-primary-active"

  if (isExternalLink) {
    return (
      <a
        className={`${style} ${className}`}
        href={to}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : ""}
      >
        {children}
      </a>
    )
  }

  return (
    <GatsbyLink to={to} className={`${style} ${className}`}>
      {children}
    </GatsbyLink>
  )
}

Link.defaultProps = {
  target: "",
  variant: "link",
  className: "",
}
