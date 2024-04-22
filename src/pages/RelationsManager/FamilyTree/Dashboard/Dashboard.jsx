import { useState } from "react";
import DashCard from "./DashCard";
import { DayCalendar } from "@mui/x-date-pickers/internals";
import Calendar from "./Calendar";
import UpcomingEvents from "./UpcomingEvents";

export default function Dashboard() {
  const [familyData, setFamilyData] = useState({
    summary: [
        { title: "Total People", text: "1762" },
        { title: "Male", text: "900" },
        { title: "Female", text: "612" },
        { title: "Member", text: "0" },
        { title: "Key Person", text: "1" },
    ],
  });
  return (
    <>
      <div className="dash-cards">
        {familyData?.summary.map((summary) => (
          <DashCard data={summary} />
        ))}
      </div>
      <div className="dash-events dash-cards">
      <Calendar/>
      {/* <Calendar/> */}
      {/* <UpcomingEvents /> */}
      </div>
    </>
  );
}
