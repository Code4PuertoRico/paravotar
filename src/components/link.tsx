import { ReactNode } from "react"
import { Link as RRLink } from "react-router-dom"

type Props = {
  variant: "primary" | "inverse" | "link" | "danger"
  to: string
  children: ReactNode | string
  target?: string
  className: string
  download?: boolean
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
  download,
}: Props) {
  const isExternalLink =
    to.includes("https") || to.includes("tel") || to.includes("http")
  const classes = style[variant]

  if (isExternalLink || download === true) {
    return (
      <a
        className={`${classes} ${className}`}
        href={to}
        target={target}
        download={download}
        rel={target === "_blank" ? "noopener noreferrer" : ""}
      >
        {children}
      </a>
    )
  }

  return (
    <RRLink to={to} className={`${style} ${className}`}>
      {children}
    </RRLink>
  )
}

Link.defaultProps = {
  target: "",
  variant: "link",
  className: "",
}
