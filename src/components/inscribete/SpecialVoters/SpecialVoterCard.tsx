import Download from "../../../assets/icons/download.svg?url";
import List from "../../../assets/icons/list.svg?url";
import Typography from "../../typography";
import Dropdown from "../../button-dropdown";
import Button from "../../button";
import Link from "../../link";
import Card from "../../card";
import { useTranslation } from "react-i18next";

type Props = {
  icon: string;
  title: string;
  summary: string;
  deadline: string;
  detailsTitle: string;
  documents: Array<{ title: string; link: string }>;
  onClickRequirements: () => void;
};

export default function SpecialVoterCard(voter: Props) {
  const { t } = useTranslation();

  return (
    <Card className="text-center mx-2">
      <img className="w-12 h-auto m-auto" src={voter.icon} alt="" />
      <Typography
        tag="h4"
        variant="h4"
        className="mt-4 uppercase tracking-wide"
      >
        {voter.title}
      </Typography>
      <Typography tag="p" variant="p" className="mt-3">
        {voter.summary}
      </Typography>
      <Typography tag="p" variant="h4" className="mt-3" weight="semibold">
        {t("site.special-voters-deadline-text")}
        <br />
        <span className="text-primary">
          <time>{voter.deadline}</time>
        </span>
      </Typography>

      {voter.documents.length > 1 ? (
        <Dropdown
          selectedOption={voter.title}
          options={voter.documents.map((document) => ({
            value: t(document.title),
          }))}
          onSelect={(docTitle: string) => {
            if (docTitle == "Voto Adelantado" || docTitle == "Early Vote")
              docTitle = "site.absentee-voter-dropdown-01";
            else if (
              docTitle == "Voto en el Domicilio" ||
              docTitle == "Vote at Home"
            )
              docTitle = "site.absentee-voter-dropdown-02";
            else if (
              docTitle == "Voto por el Teléfono" ||
              docTitle == "Vote by Phone"
            )
              docTitle = "site.absentee-voter-dropdown-03";
            else if (
              docTitle == "Voto Adelantado (Inglés)" ||
              docTitle == "Early Vote (English)"
            )
              docTitle = "site.absentee-voter-dropdown-04";
            else docTitle = "none";

            const document = voter.documents.find(
              (doc) => doc.title === docTitle
            );

            // Open download in a new tab.
            window.open(document?.link, "_blank");
          }}
        />
      ) : (
        <Link
          to={voter.documents[0].link}
          target="_blank"
          variant="primary"
          className="mt-6"
        >
          <img className="mr-1 h-5 w-5 inline-block" src={Download} />{" "}
          {t("site.early-voter-dropdown")}
        </Link>
      )}
      <Button
        variant="inverse"
        className="mt-4"
        onClick={voter.onClickRequirements}
      >
        <img className="mr-1 h-5 w-5 inline-block" src={List} />{" "}
        {voter.detailsTitle}
      </Button>
    </Card>
  );
}
