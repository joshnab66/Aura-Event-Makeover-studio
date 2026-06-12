export interface ServiceItem {
  id: string;
  category: "event" | "makeover";
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  image: string;
  priceStart: string;
}

export interface PricingPlan {
  id: string;
  category: "wedding" | "corporate" | "beauty";
  tier: "Basic" | "Premium" | "Luxury" | "Small" | "Medium" | "Elite";
  title: string;
  price: string;
  subtitle: string;
  features: string[];
  popular?: boolean;
}

export interface Testimony {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  event: string;
}

export interface GalleryItem {
  id: string;
  category: "weddings" | "corporate" | "birthdays" | "bridal" | "groom";
  title: string;
  subtitle: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  certifications: string[];
  avatar: string;
}

export interface CustomThemeOption {
  id: string;
  name: string;
  colorHex: string;
  description: string;
}

export interface ProposalResponse {
  eventThemes: string[];
  makeoverDesign: string;
  suggestedTimeline: {
    phase: string;
    activity: string;
    timing: string;
  }[];
  itemizedCost: {
    category: string;
    service: string;
    estimatedCost: string;
  }[];
  luxeSummary: string;
}

export interface BookingSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  dateTime: string;
  approxBudget: string;
  guestCount: number;
  specialRequirements: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
