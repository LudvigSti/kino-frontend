import './Modal.css';

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }
    return (
        <div className = "modal">
            <div className = "modal-content">
                <div className = "close-button" onClick = {onClose}> x </div>
                {children}
            </div>
        </div>
    )
};

export default Modal;