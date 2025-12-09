interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedTrack: "project-management" | "quality-assurance" | null;
    selectedProgram: "launchpad" | "professional" | null;
}
export declare function ApplicationModal({ isOpen, onClose, selectedTrack, selectedProgram }: ApplicationModalProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ApplicationModal.d.ts.map