import React, { ReactChild } from "react"

const Variants = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
}
type VariantsOptions = typeof Variants

const Weights = {
  extrabold: "extrabold",
  bold: "bold",
  base: "base",
  light: "light",
}
type WeightOptions = typeof Weights

function getVariantStyles(
  variant: keyof VariantsOptions,
  weight?: keyof WeightOptions
) {
  switch (variant) {
    case Variants.h1: {
      const defaultWeight = "font-extrabold"
      const fontWeight = weight ? Weights[weight] : defaultWeight

      return `text-dark ${fontWeight} text-9xl`
    }

    case Variants.h2: {
      const defaultWeight = "font-bold"
      const fontWeight = weight ? Weights[weight] : defaultWeight

      return `text-dark ${fontWeight} text-2xl`
    }

    case Variants.h3: {
      const defaultWeight = "font-bold"
      const fontWeight = weight ? Weights[weight] : defaultWeight

      return `text-dark ${fontWeight} text-xl`
    }

    case Variants.h4: {
      const defaultWeight = "font-bold"
      const fontWeight = weight ? Weights[weight] : defaultWeight

      return `text-dark ${fontWeight} text-lg`
    }

    case Variants.p: {
      const defaultWeight = "font-base"
      const fontWeight = weight ? Weights[weight] : defaultWeight

      return `text-dark ${fontWeight}`
    }

    default:
      return ""
  }
}

type Props = {
  variant: keyof VariantsOptions
  children: ReactChild
  className?: string
  weight?: keyof WeightOptions
}

export default function Typography({
  variant,
  className,
  children,
  weight,
}: Props) {
  const variantStyle = getVariantStyles(variant, weight)

  return React.createElement(
    variant,
    {
      className: `${variantStyle} ${className}`,
    },
    children
  )
}

Typography.defaultProps = {
  className: "",
}
