import React, { ReactChildren } from "react"
import { Link as GatsbyLink } from "gatsby"

type Props = {
  variant: "button" | "link"
  to: string
  children: ReactChildren | string
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
  const isExternalLink = to.includes("https") || to.includes("tel")
  const style =
    variant === "link"
      ? "text-primary font-medium"
      : "inline-block rounded border border-primary bg-transparent text-primary font-bold py-2 px-4 text-xs uppercase hover:bg-primary-hover hover:text-white active:text-white-active active:bg-primary-active"

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
