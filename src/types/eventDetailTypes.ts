import type { EventDetails } from './eventTypes';
import type { GroupRegistrationOutput } from './groupRegistration';
import type { Organizer } from "./eventTypes";

export interface EventDetailProps {
  event: EventDetails;
  onStarToggle?: () => void;
  onRegister?: () => void;
  onGroupRegister?: (data: GroupRegistrationOutput) => void;
  onFeedback?: () => void;
  isStarLoading?: boolean;
  isRegisterLoading?: boolean;
  isLoggedIn?: boolean;
}

export interface EventOrganisersProps {
  event: EventDetails;
  onOrganizerClick?: (organizer: Organizer) => void;
}
