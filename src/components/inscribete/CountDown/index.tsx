import { useState, useCallback, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { enUS, es } from "date-fns/locale";
import differenceInDays from "date-fns/differenceInDays";
import differenceInHours from "date-fns/differenceInHours";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInSeconds from "date-fns/differenceInSeconds";
import format from "date-fns/format";

import Typography from "../../typography";
import Card from "../../card";

const LAST_DAY = new Date("September 14, 2020 21:00:00");

function Counter({ timeLeft, title }: { timeLeft: string; title: string }) {
  return (
    <div className="text-center">
      <div className="flex justify-center">
        {timeLeft.split("").map((item, index) => {
          return (
            <div
              key={`${title}-${item}-${index}`}
              className="relative text-center m-1 bg-background shadow"
            >
              <div className="absolute flex items-center justify-center w-full h-12 lg:h-16">
                <Typography
                  tag="h2"
                  variant="h2"
                  className="text-2xl text-dark lg:text-4xl"
                  weight="semibold"
                >
                  {item}
                </Typography>
              </div>
              <div className="h-6 w-8 bg-background rounded-t lg:h-8 lg:w-12"></div>
              <div className="h-6 w-8 bg-background rounded-b border border-b-0 border-l-0 border-r-0 border-separator lg:h-8 lg:w-12"></div>
            </div>
          );
        })}
      </div>
      <Typography
        tag="p"
        variant="p"
        className="uppercase text-sm text-dark lg:text-normal"
        weight="semibold"
      >
        {title}
      </Typography>
    </div>
  );
}

type TimeLeft = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

export function CountDown() {
  const { t, i18n } = useTranslation();
  const getTimeLeft = useCallback(() => {
    const today = new Date();

    if (differenceInSeconds(LAST_DAY, today) % 60 > 0) {
      const days = differenceInDays(LAST_DAY, today);
      const hours = differenceInHours(LAST_DAY, today) % 24;
      const minutes = differenceInMinutes(LAST_DAY, today) % 60;
      const seconds = differenceInSeconds(LAST_DAY, today) % 60;

      return {
        days: `${days < 10 ? `0${days}` : `${days}`}`,
        hours: `${hours < 10 ? `0${hours}` : `${hours}`}`,
        minutes: `${minutes < 10 ? `0${minutes}` : `${minutes}`}`,
        seconds: `${seconds < 10 ? `0${seconds}` : `${seconds}`}`,
      };
    }

    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }, []);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Typography tag="h3" variant="h2" weight="base" className="mt-3">
        {t("counter.time-is-running-out")}
      </Typography>
      <div className="mt-4 mx-auto md:w-9/12">
        <Card>
          <div className="flex justify-around">
            <Counter timeLeft={timeLeft.days} title={t("counter.days")} />
            <Counter timeLeft={timeLeft.hours} title={t("counter.hours")} />
            <Counter timeLeft={timeLeft.minutes} title={t("counter.minutes")} />
            <div className="hidden md:inline">
              <Counter
                timeLeft={timeLeft.seconds}
                title={t("counter.seconds")}
              />
            </div>
          </div>
        </Card>
      </div>
      <Typography tag="h3" variant="p" className="mt-2">
        {t("counter.last-day")}: <br className="lg:hidden" />
        <span className="font-bold">
          {format(LAST_DAY, "PPPP", {
            locale: i18n.language === "en" ? enUS : es,
          })}
        </span>
      </Typography>
    </div>
  );
}
