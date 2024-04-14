import { createContext } from "react";

export interface UserContextType {
  // Define your context state and any methods here
  location: string;
  setLocation: (newString: string) => void;
  userId: any,
  setUserId: (newNumber:any) => void;
  userName: string;
  setUserName: (newString: string) => void;
  morningAddress: string;
  setMorningAddress: (newString: string) => void;
  eveningAddress: string;
  setEveningAddress: (newString: string) => void;
  dueTiffins: any,
  setDueTiffins: (newNumber:any) => void;
  mob: string;
  setMob: (newString: string) => void;
  balance: string;
  setBalance: (newString: string) => void;
  timing: string;
  setTiming: (newString: string) => void;
  feedbackId: number;
  setFeedbackId: (newId: number) => void;
  feedbackTitle: string;
  setFeedbackTitle: (newString: string) => void;
  feedbackBody: string;
  setFeedbackBody: (newString: string) => void;
  deliveryAgentName: string;
  setDeliveryAgentName: (newString: string) => void;
  deliveryAgentMob: string;
  setDeliveryAgentMob: (newString: string) => void;
  deliveryAgentParnterCode: string;
  setDeliveryAgentPartnerCode: (newString: string) => void;
  deliveryAgentId: number;
  setDeliveryAgentId: (newId: number) => void;
  userDetails: any;
  setUserDetails: (newArray: any) => void;
  cancelMeal: (id: number) => void;
  pauseMeal: (arr: any, userId: any) => void;
  demoDeliveries: any;
  setDemoDeliveries: (newArray: any) => void;
  results: any;
  setResults: (newArray: any) => void;
  getDemoDeliveries: () => void;
  getCompletedDeliveries: () => void;
  showCompleted: any;
  setShowCompleted: (newBoolean: any) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
