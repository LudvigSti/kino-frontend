import "./time-table.css";
import Button from "../Button/Button";
import { useEffect, useState } from "react";

const Timetable = ({ screenings, movie }) => {
  const [screeningsByLocation, setScreeningsByLocation] = useState([]);

  // Get unique cinema locations
  const getUniqueLocations = () => {
    const locations = [
      ...new Set(screenings.map((screening) => screening.cinemaHall.name)),
    ];
    return locations;
  };

  const getScreeningsByLocation = (locations) => {
    const screeningLocations = locations.map((name) => {
      const filteredScreenings = screenings.filter(
        (screening) => screening.cinemaHall.name === name
      );
      return {
        name,
        screenings: filteredScreenings,
      };
    });
    return screeningLocations;
  };

  // Sort screenings by time
  const sortScreeningsByTime = (screeningLocations) => {
    const sortedScreenings = screeningLocations.map((location) => {
      return {
        ...location,
        screenings: location.screenings.sort(
          (a, b) => new Date(a.screeningTime) - new Date(b.screeningTime)
        ),
      };
    });
    return sortedScreenings;
  };

  useEffect(() => {
    const locations = getUniqueLocations();
    const screeningsByLocation = getScreeningsByLocation(locations);
    const sortedScreenings = sortScreeningsByTime(screeningsByLocation);
    setScreeningsByLocation(sortedScreenings);
  }, [screenings]);

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
      {screeningsByLocation.length > 0 ? (
        <div className='screening-list'>
          {screeningsByLocation.map((screeningList, index) => (
            <div key={index}>
              <h3>{screeningList.name}</h3>
              <ul>
                {screeningList.screenings.map((screening, index) => (
                  <li key={index} className='screening'>
                    <div className='screening-time'>
                      {formatTime(new Date(screening.screeningTime))}
                      {" ---> "}
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
