import Button from "../Button/Button";
import { Screening } from "../TimeTable/TimeTable";
import { useState } from "react";
import "./ticket-selection.css";

interface TicketSelectionProps {
    screening: Screening;
    onContinueClick(count: number): void;
}

const TicketSelection = ({ screening, onContinueClick } : TicketSelectionProps) => {
    const [ticketCount, setTicketCount] = useState(1);

    const formatTime = (time: string): string => {
        const date = new Date(time);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
        return formattedTime;
    }

    return (
        <div className="ticket-selection">
            <h2>Velg antall billetter for film {screening.movie.title}</h2>
            <p>På sal: {screening.cinemaHall.name}</p>
            <p>Klokkeslett: {formatTime(screening.screeningTime)}</p>
            <div className="ticket-amount">
                <button onClick={() => setTicketCount(ticketCount - 1)} className="ticket-button">-</button>
                <span>{ticketCount}</span>
                <button onClick={() => setTicketCount(ticketCount + 1)} className="ticket-button">+</button>
            </div>
            <Button Text={"Videre til setevalg"} Size={"medium"} onClick={() => onContinueClick(ticketCount)}/>
        </div>
    )
};

export default TicketSelection;