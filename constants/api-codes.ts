import { 
  Accessibility,
  CircleParking, 
  DoorOpen, 
  ArrowDownUp
} from 'lucide-react'

export enum AreaCode {
  SEOUL    = '1',
  INCHEON  = '2',
  DAEJEON  = '3',
  DAEGU    = '4',
  GWANGJU  = '5',
  BUSAN    = '6',
  ULSAN    = '7',
  SEJONG   = '8',
  GYEONGGI = '31',
  GANGWON  = '32',
  CHUNGBUK = '33',
  CHUNGNAM = '34',
  GYEONGBUK = '35',
  GYEONGNAM = '36',
  JEONBUK  = '37',
  JEONNAM  = '38',
  JEJU     = '39',
}

export enum ContentType {
  TOURISM    = '12',
  LODGING    = '32',
  RESTAURANT = '39',
}

export const BARRIER_ICONS = {
  wheelchair: { icon: Accessibility, label: '휠체어' },
  elevator:   { icon: ArrowDownUp,   label: '엘리베이터' },
  parking:    { icon: CircleParking, label: '장애인주차' },
  restroom:   { icon: DoorOpen,      label: '장애인화장실' },
}

export function getActiveIcons(place: Record<string, string | null>) {
  return Object.entries(BARRIER_ICONS)
    .filter(([key]) => place[key] !== null)
}