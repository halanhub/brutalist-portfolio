import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const format = () =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: profile.timeZone,
  }).format(new Date());

/** Current wall-clock time in Tbilisi, updated every 15 seconds. */
export const useTbilisiTime = () => {
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
};
