import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "./index"

const LanguageMenu = (props: any) => {
  const { t, i18n } = useTranslation()

  const [language, setLanguage] = useState("es")

  return (
    <>
      <Button
        className="mt-4 mb-4"
        onClick={() => {
          if (language === "es") {
            i18n.changeLanguage("en")
            setLanguage("en")
          } else {
            i18n.changeLanguage("es")
            setLanguage("es")
          }
        }}
      >
        {t("site.Language-Button")}
      </Button>
    </>
  )
}

export default LanguageMenu
