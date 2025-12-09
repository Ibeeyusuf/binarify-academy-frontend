import { useState } from "react";

interface ApplicationModalState {
  isOpen: boolean;
  selectedTrack: "project-management" | "quality-assurance" | null;
  selectedProgram: "launchpad" | "professional" | null;
}

export function useApplicationModal() {
  const [modalState, setModalState] = useState<ApplicationModalState>({
    isOpen: false,
    selectedTrack: null,
    selectedProgram: null,
  });

  const openModal = (
    track: "project-management" | "quality-assurance" | null,
    program?: "launchpad" | "professional"
  ) => {
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