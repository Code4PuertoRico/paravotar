import { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageMenu = () => {
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState("es");

  return (
    <>
      <button
        className="text-primary text-xs font-semibold uppercase hover:underline"
        onClick={() => {
          if (language === "es") {
            i18n.changeLanguage("en");
            setLanguage("en");
          } else {
            i18n.changeLanguage("es");
            setLanguage("es");
          }
        }}
      >
        {t("site.Language-Button")}
      </button>
    </>
  );
};

export default LanguageMenu;
