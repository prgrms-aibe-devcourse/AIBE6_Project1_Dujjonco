import { 
  Accessibility,
  ParkingCircle, 
  DoorOpen, 
  ArrowUpDown
} from 'lucide-react'

export const BARRIER_ICONS = {
  wheelchair:  { icon: Accessibility, label: '휠체어' },
  elevator:    { icon: ArrowUpDown,   label: '엘리베이터' },
  parking:     { icon: ParkingCircle, label: '장애인주차' },
  restroom:    { icon: DoorOpen,      label: '장애인화장실' },
}

export function getActiveIcons(place: Record<string, string | null>) {
  return Object.entries(BARRIER_ICONS)
    .filter(([key]) => place[key] !== null)
}