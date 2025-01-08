import "./time-table.css";
import { useEffect, useState } from "react";
import TimeTableItem from "../TimeTableItem/TimeTableItem";

interface Screening {
  screeningId: number;
  cinemaHall: {
    hallId: number;
    name: string;
    capacity: number;
  };
  screeningTime: string;
  movie: {
    title: string;
    duration: number;
    images: string[];
  }
  about: string;
}

export type { Screening };

interface TimetableProps {
  screenings: Screening[];
}

const Timetable = ({ screenings }: TimetableProps) => {
  const [screeningsByLocation, setScreeningsByLocation] = useState<SortedScreeningLocation[]>([]);

  // Get unique cinema locations
  const getUniqueLocations = () => {
    const locations = [
      ...Array.from(new Set(screenings.map((screening) => screening.cinemaHall.name))),
    ];
    return locations;
  };

  interface ScreeningLocation {
    name: string;
    screenings: Screening[];
  }

  const getScreeningsByLocation = (locations: string[]): ScreeningLocation[] => {
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
  interface SortedScreeningLocation extends ScreeningLocation {
    screenings: Screening[];
  }

  const sortScreeningsByTime = (screeningLocations: ScreeningLocation[]): SortedScreeningLocation[] => {
    const sortedScreenings = screeningLocations.map((location) => {
      return {
        ...location,
        screenings: location.screenings.sort(
          (a, b) => new Date(a.screeningTime).getTime() - new Date(b.screeningTime).getTime()
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
                  <li key={index}>
                    <TimeTableItem screening={screening} />
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
