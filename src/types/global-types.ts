export interface ErrorResponse {
  error: string;
  details?: string;
}

export interface DefaultResponse {
  message: string;
}


export interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}