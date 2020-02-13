import React, { ReactChild } from "react"

const Variants = {
  primary: "primary",
  inverse: "inverse",
}
type VariantOptions = typeof Variants

function getButtonStyle(variant: keyof VariantOptions) {
  switch (variant) {
    case Variants.inverse: {
      return "rounded border border-primary bg-transparent text-primary font-bold py-1 px-4 hover:bg-primary-hover hover:text-white-hover active:text-white-active active:bg-primary-active"
    }

    default: {
      return "rounded border border-primary bg-primary text-white py-1 font-bold px-4 hover:bg-primary-hover hover:text-white-hover active:text-white-active active:bg-primary-active"
    }
  }
}

type Props = {
  variant: keyof VariantOptions
  onClick: () => void
  children: ReactChild | ReactChild[]
  className?: string
}

export default function Button({
  variant,
  onClick,
  children,
  className,
}: Props) {
  const style = getButtonStyle(variant)

  return (
    <button className={`${style} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  variant: Variants.primary,
  className: "",
}
