import "./time-table.css";
import Button from "../Button/Button";

const Timetable = ({ screenings }) => {
  const unique_locations = [
    ...new Set(screenings.map((screening) => screening.location)),
  ];

  const screenings_by_location = unique_locations.map((location) => {
    return screenings.filter((screening) => screening.location === location);
  });

  //sort screenings by time
  screenings_by_location.forEach((screening) => {
    screening.sort((a, b) => {
      const time1 = a.time.split(":");
      const time2 = b.time.split(":");
      return time1[0] - time2[0] || time1[1] - time2[1];
    });
  });

  const timeFinished = (time, duration_minutes) => {
    const [timePart, meridiem] = time.split(" ");
    const [hours, minutes] = timePart.split(":").map(Number);

    const date = new Date();
    date.setHours(meridiem === "PM" && hours !== 12 ? hours + 12 : hours);
    date.setMinutes(minutes);

    date.setMinutes(date.getMinutes() + duration_minutes);

    // Format back to "hh:mm AM/PM"
    const newHours = date.getHours() % 12 || 12; // Convert 24-hour format to 12-hour
    const newMinutes = String(date.getMinutes()).padStart(2, "0"); // Ensure 2-digit minutes
    const newMeridiem = date.getHours() >= 12 ? "PM" : "AM";

    return `${newHours}:${newMinutes} ${newMeridiem}`;
  };

  return (
    <div className='timetable'>
      <h2>Visninger:</h2>
      {screenings.length > 0 ? (
        <div className='screening-list'>
          {screenings_by_location.map((screening, index) => (
            <div key={index}>
              <h3>{screening[0].location}</h3>
              <ul>
                {screening.map((screening, index) => (
                  <li key={index} className='screening'>
                    <div className='screening-time'>
                      {screening.time}
                      {" ---- "}
                      {timeFinished(screening.time, screening.duration)}
                    </div>
                    <Button Text='Bestill' Size='small' />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No screenings available at the moment.</p>
      )}
    </div>
  );
};

export default Timetable;
