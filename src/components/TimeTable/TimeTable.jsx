import "./time-table.css";
import Button from "../Button/Button";

const Timetable = ({ screenings, movie }) => {
  console.log(screenings);
  const unique_locations = [
    ...new Set(screenings.map((screening) => screening.name)),
  ];

  const screenings_by_location = unique_locations.map((location) => {
    return screenings.filter((screening) => screening.location === location);
  });

  //sort screenings by time
  screenings_by_location.forEach((screenings) => {
    console.log(screenings);
    screenings.sort((a, b) => {
      const time1 = a.screeningTime.split(":");
      const time2 = b.screeningTime.split(":");
      return time1[0] - time2[0] || time1[1] - time2[1];
    });
  });

  const getTimeFinished = (time, duration_minutes) => {
    const date = new Date(time);
    date.setMinutes(date.getMinutes() + duration_minutes);

    return formatTime(date);
  };

  const formatTime = (time) => {
    // Format to "hh:mm AM/PM"
    const newHours = time.getHours() % 12 || 12; // Convert 24-hour format to 12-hour
    const newMinutes = String(time.getMinutes()).padStart(2, "0"); // Ensure 2-digit minutes
    const newMeridiem = time.getHours() >= 12 ? "PM" : "AM";

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
                      {formatTime(new Date(screening.screeningTime))}
                      {" ---- "}
                      {getTimeFinished(screening.screeningTime, movie.duration)}
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
