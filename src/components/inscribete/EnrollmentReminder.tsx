import { useTranslation } from "react-i18next";
import Typography from "../typography";
import ReminderIllustration from "../../assets/images/reminder-illustration.png";
import Link from "../link";

export function EnrollmentReminder() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="text-center">
        <Typography
          id="enrollment-reminder"
          tag="h2"
          variant="h3"
          className="uppercase tracking-wide"
        >
          {t("site.enrollment-reminder")}
        </Typography>
        <Typography
          tag="h3"
          variant="h2"
          weight="base"
          className="font-normal mt-4"
        >
          {t("site.enrollment-reminder-guide1")}
        </Typography>
      </div>
      <div className="flex flex-wrap md:flex-row-reverse items-center mt-12">
        <div className="w-full lg:w-1/2">
          <img
            className="mx-auto"
            src={ReminderIllustration}
            aria-hidden="true"
            alt=""
          />
        </div>
        <div className="w-full lg:mt-3 lg:w-1/2">
          <Typography tag="p" variant="p" className="mt-4">
            {t("site.enrollment-reminder-guide2")}
          </Typography>
          <Link
            className="mt-6 w-full pt-2 pb-2 md:w-1/2"
            variant="primary"
            to={`/ics/enroll_${i18n.language || "es"}.ics`}
            download
          >
            {t("site.add-to-calendar")}
            <span className="sr-only">{t("site.add-to-calendar")}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
