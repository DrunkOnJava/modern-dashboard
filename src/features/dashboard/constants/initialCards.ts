import {
  Users,
  UserCheck,
  Activity,
  DollarSign,
  ShoppingCart,
  Clock,
  Battery,
  Signal,
  Cpu,
  HardDrive,
  Thermometer,
  Server,
  AlertCircle,
  Shield,
  Package,
  Cloud,
  Lock,
  Timer
} from 'lucide-react';
import type { DashboardCardData } from '../types';

export const initialCards: DashboardCardData[] = [
  {
    id: '1',
    title: 'Active Users',
    value: 0,
    icon: Users,
    trend: 5,
    color: 'blue',
    minValue: 100,
    maxValue: 500
  },
  // ... rest of the cards
];