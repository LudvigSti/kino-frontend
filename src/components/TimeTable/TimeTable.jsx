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
                    <div className='screening-time'>{screening.time}</div>
                    <div className='screening-location'>
                      {screening.location}
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
