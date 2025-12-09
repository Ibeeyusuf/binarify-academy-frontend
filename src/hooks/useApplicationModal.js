import { useState } from "react";
export function useApplicationModal() {
    const [modalState, setModalState] = useState({
        isOpen: false,
        selectedTrack: null,
        selectedProgram: null,
    });
    const openModal = (track, program) => {
        setModalState({
            isOpen: true,
            selectedTrack: track,
            selectedProgram: program || null,
        });
    };
    const closeModal = () => {
        setModalState({
            isOpen: false,
            selectedTrack: null,
            selectedProgram: null,
        });
    };
    return {
        ...modalState,
        openModal,
        closeModal,
    };
}
