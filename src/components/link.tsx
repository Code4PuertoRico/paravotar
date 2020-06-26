import React, { ReactNode } from "react"
import { Link as GatsbyLink } from "gatsby"

type Props = {
  variant: "primary" | "inverse" | "link" | "danger"
  to: string
  children: ReactNode | string
  target?: string
  className: string
}

const style = {
  link: "text-primary font-medium hover:underline",
  inverse:
    "flex align-center justify-center rounded border border-primary bg-transparent text-primary font-bold py-1 px-4 text-sm hover:bg-primary-hover hover:text-white active:text-white-active active:bg-primary-active",
  primary:
    "flex align-center justify-center rounded border border-primary bg-primary text-white py-1 font-bold px-4 text-sm hover:bg-primary-hover hover:text-white active:text-white-active active:bg-primary-active",
  danger:
    "flex align-center justify-center rounded border border-red bg-red text-white py-1 font-bold px-4 text-sm hover:bg-red-hover hover:text-white active:text-white-active active:bg-red-active",
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
  const classes = style[variant]

  if (isExternalLink) {
    return (
      <a
        className={`${classes} ${className}`}
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
