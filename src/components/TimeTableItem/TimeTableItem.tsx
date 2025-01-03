import Button from "../Button/Button";
import { Screening } from "../TimeTable/TimeTable";
import SeatSelection from "../SeatSelection/SeatSelection";
import { useState } from "react";
import "../TimeTable/time-table.css";
import TicketSelection from "../TicketSelection/TicketSelection";
import Modal from "../Modal/Modal";
import PurchaseInfoSelection from "../PurchaseInfoSelection/PurchaseInfoSelection";
import { userProfile } from "../../pages/Profile/profile";
import Reciept from "../Reciept/Reciept";

interface TimeTableItemProps {
  screening: Screening;
}

const TimeTableItem = ( { screening }: TimeTableItemProps) => {
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
    const [isPurchaseInfoSelectionModalOpen, setIsPurchaseInfoSelectionModalOpen] = useState(false);
    const [isRecieptModalOpen, setIsRecieptModalOpen] = useState(false);

    const [ticketCount, setTicketCount] = useState(1);
    const [selectedSeats, setSelectedSeat] = useState<number []>([])
    const [selectedProfile, setSelectedProfile] = useState<userProfile | null>(null);

    const getTimeFinished = (time: string, duration_minutes: number): string => {
        const date = new Date(time);
        date.setMinutes(date.getMinutes() + duration_minutes);

        return formatTime(date);
    };

    const formatTime = (time: Date): string => {
        // Format to "hh:mm AM/PM"
        const newHours = time.getHours() % 12 || 12; // Convert 24-hour format to 12-hour
        const newMinutes = String(time.getMinutes()).padStart(2, "0"); // Ensure 2-digit minutes
        const newMeridiem = time.getHours() >= 12 ? "PM" : "AM";

        return `${newHours}:${newMinutes} ${newMeridiem}`;
    };

    const openTicketModal = () => {
        setIsTicketModalOpen(true);
    }

    const handleTicketsSelected = (count: number) => {
        setTicketCount(count);
        setIsTicketModalOpen(false);
        setIsSeatModalOpen(true);
    }

    const handleSeatsSelected = (seats: number []) => {
        setSelectedSeat(seats);
        setIsSeatModalOpen(false);
        setIsPurchaseInfoSelectionModalOpen(true);
    }

    const handleProfileSelected = ( profile: userProfile) => {
        setSelectedProfile(profile);
        setIsPurchaseInfoSelectionModalOpen(false);
        setIsRecieptModalOpen(true);
    }

    const closeReciept = () => {
        setIsRecieptModalOpen(false);
    }

    return (
        <div className="screening">
            <div className='screening-time'>
                {"Start: "}
                {formatTime(new Date(screening.screeningTime))}
                <br></br>
                {"Slutt: "}
                {getTimeFinished(screening.screeningTime, screening.movie.duration)}
            </div>
            <p className='screening-about'>{screening.about}</p>
            <Button Text='Bestill' Size='small' onClick={openTicketModal}/>
                <Modal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)}>
                    <TicketSelection screening={screening} onContinueClick={handleTicketsSelected}/>
                </Modal>
                <Modal isOpen={isSeatModalOpen} onClose={() => setIsSeatModalOpen(false)}>
                    <SeatSelection ticketCount={ticketCount} onContinueClick={handleSeatsSelected}/>
                </Modal>
                <Modal isOpen={isPurchaseInfoSelectionModalOpen} onClose={() => setIsPurchaseInfoSelectionModalOpen(false)}>
                    <PurchaseInfoSelection onContinueClick={handleProfileSelected}/>
                </Modal>
                <Modal isOpen={isRecieptModalOpen} onClose={() => setIsRecieptModalOpen(false)}> 
                    <Reciept userProfile={selectedProfile} screening={screening} seats={selectedSeats} close={closeReciept}/>
                </Modal>
        </div>
    );
};

export default TimeTableItem;