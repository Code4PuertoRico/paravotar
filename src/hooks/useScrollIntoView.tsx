import { useEffect } from "react";
import { Location } from "react-router-dom";

export default function useScrollIntoView(location: Location) {
  useEffect(() => {
    console.log(document);
    if (document == null) return;

    const { hash } = location;

    if (hash == null || hash == "") return;

    const element = document.querySelector(hash);

    if (element == null) return;

    element.scrollIntoView();
  }, [location]);
}
