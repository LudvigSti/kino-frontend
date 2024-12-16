import { useState } from "react";
import "./seat-selection.css";

interface SeatSelectionProps {
  ticketCount: number;
  onContinueClick(seats: number[]): void;
}

const SeatSelection = ({ ticketCount, onContinueClick }: SeatSelectionProps) => {
  const [selectedSeat, setSelectedSeat] = useState<number []>([])

  //Fram til vi har koblet backenden til, så er dette en placeholder for å vise at vi kan velge seter
  const seats = Array.from({ length: 50 }, (_, i) => i + 1);
  
  const toggleSeatSelection = (seatNumber: number) => {
        if (selectedSeat.includes(seatNumber)) {
        const newSelectedSeat = [...selectedSeat]; 
        setSelectedSeat(newSelectedSeat.filter((seat) => seat !== seatNumber));
        } 
        else if (selectedSeat.length < ticketCount) {
        setSelectedSeat([...selectedSeat, seatNumber]);
        }
};

  const isSeatSelected = (seatNumber: number) => selectedSeat.includes(seatNumber);
  const createSeatSelectionString = () => selectedSeat.join(", ");

  return (
    <div className="seat-selection">
      <h1>Seat Selection</h1>
      <p>Selected seat(s): {createSeatSelectionString()}</p>
        <div className = "seat-map">
            {seats.map((seat) => (
            <button
                key={seat}
                onClick={() => {
                    toggleSeatSelection(seat)
                }}
                style={{
                backgroundColor: isSeatSelected(seat) ? "red" : "green",
                color: "white",
                margin: "3px",
                padding: "3px",
                width: "30px",
                height: "30px",
                }}
            >
                {seat}
            </button>
            ))}
        </div>
        <button className="confirm-button"  disabled={selectedSeat.length < ticketCount} onClick={() => onContinueClick(selectedSeat)}>
            Bestill billetter
        </button>
    </div>
  );
};

export default SeatSelection;