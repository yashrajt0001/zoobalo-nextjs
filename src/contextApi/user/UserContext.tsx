import { createContext } from "react";

export interface UserContextType {
  // Define your context state and any methods here
  location: string;
  setLocation: (newString : string) => void;
  name: string;
  setName: (newString : string) => void;
  address: string;
  setAddress: (newString : string) => void;
  mob: string;
  setMob: (newString : string) => void;
  balance: string;
  setBalance: (newString : string) => void;
  timing: string;
  setTiming: (newString: string) => void;
  feedbackId: number,
  setFeedbackId: (newId: number) => void;
  feedbackTitle: string,
  setFeedbackTitle: (newString: string) => void;
  feedbackBody: string,
  setFeedbackBody: (newString: string) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
