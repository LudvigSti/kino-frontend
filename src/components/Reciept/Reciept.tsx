import { Screening } from "../TimeTable/TimeTable";
import { userProfile } from "../../pages/Profile/profile";
import './reciept.css';
import Button from "../Button/Button";

interface RecieptProps {
    userProfile: userProfile | null;
    screening: Screening;
    seats: number[];
    close: () => void;
}

const Reciept = ( { userProfile, screening, seats, close }: RecieptProps ) => {

  const price = 200;

  const formatTime = (time: Date): string => {
      // Format to "hh:mm AM/PM"
      const newHours = time.getHours() % 12 || 12; // Convert 24-hour format to 12-hour
      const newMinutes = String(time.getMinutes()).padStart(2, "0"); // Ensure 2-digit minutes
      const newMeridiem = time.getHours() >= 12 ? "PM" : "AM";

      return `${newHours}:${newMinutes} ${newMeridiem}`;
  };

  return (
    <div className="reciept">
      <h1>Reciept</h1>
      <h2>User:</h2>
      {userProfile && (
        <>
          <p>Name: {userProfile.firstName} {userProfile.lastName}</p>
          <p>Email: {userProfile.email}</p>
        </>
      )}
      <h2>Tickets:</h2>
      {
        seats.map((seat, index) => (
          <div key={index} className="ticket">
            <div className="ticket-info">
              <h3>Film: {screening.movie.title}</h3>
              <p>Sal: {screening.cinemaHall.name}</p>
              <p>Sete: {seat}</p>
              <p>Start-tid: {formatTime(new Date(screening.screeningTime))}</p>
              <p>Pris: {price}</p>
            </div>
            <div className="ticket-qrcode">
               QR-code placeholder
            </div>
          </div>
        ))
      }
      <div className="total-price">
          <p>Total pris: {price*seats.length}</p>
      </div>
      <div className="buttons">
        <Button onClick={close} Text={"Lukk"} />
      </div>
    </div>
  );
}

export default Reciept;