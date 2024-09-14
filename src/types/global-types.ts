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

export interface AlertCardsProps {
  title: string;
  description: string;
  time: string;
  id: string;
  level: "Critical" | "Warning" | "Resolved";
  handleResolve: (id: string) => Promise<{data: {message: string}
error?: string
}>;
}