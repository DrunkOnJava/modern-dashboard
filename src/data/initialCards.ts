import {
  Users,
  Activity,
  DollarSign,
  ShoppingCart,
  Clock,
  Battery,
  Signal,
  Cpu,
  HardDrive,
  Thermometer
} from 'lucide-react';
import type { DashboardCardData } from '../types/dashboard';

export const initialCards: DashboardCardData[] = [
  {
    id: '1',
    title: 'Active Users',
    value: 0,
    icon: Users,
    trend: 5,
    color: 'blue',
    minValue: 100,
    maxValue: 500,
    type: 'graph',
    history: [320, 350, 290, 400, 450, 380, 425]
  },
  {
    id: '2',
    title: 'Server Load',
    value: 0,
    icon: Activity,
    color: 'purple',
    minValue: 0,
    maxValue: 100,
    format: '%',
    type: 'compact'
  },
  {
    id: '3',
    title: 'Daily Revenue',
    value: 0,
    icon: DollarSign,
    trend: 12,
    color: 'green',
    minValue: 1000,
    maxValue: 50000,
    format: '$',
    type: 'detailed',
    description: 'Total revenue generated in the last 24 hours'
  },
  {
    id: '4',
    title: 'New Orders',
    value: 0,
    icon: ShoppingCart,
    trend: -3,
    color: 'yellow',
    minValue: 0,
    maxValue: 100
  },
  {
    id: '5',
    title: 'Response Time',
    value: 0,
    icon: Clock,
    color: 'pink',
    minValue: 50,
    maxValue: 500,
    format: 'ms'
  },
  {
    id: '6',
    title: 'Battery Level',
    value: 0,
    icon: Battery,
    color: 'green',
    minValue: 0,
    maxValue: 100,
    format: '%'
  },
  {
    id: '7',
    title: 'Network Strength',
    value: 0,
    icon: Signal,
    color: 'blue',
    minValue: 0,
    maxValue: 100,
    format: '%'
  },
  {
    id: '8',
    title: 'CPU Usage',
    value: 0,
    icon: Cpu,
    color: 'red',
    minValue: 0,
    maxValue: 100,
    format: '%',
    type: 'progress'
  },
  {
    id: '9',
    title: 'Disk Space',
    value: 75,
    icon: HardDrive,
    color: 'orange',
    minValue: 0,
    maxValue: 100,
    format: '%',
    type: 'table',
    history: [65, 70, 72, 75, 73, 74, 75]
  },
  {
    id: '10',
    title: 'Temperature',
    value: 0,
    icon: Thermometer,
    color: 'red',
    minValue: 20,
    maxValue: 80,
    format: '°C',
    type: 'stat',
    history: [65, 68, 72, 69, 71, 73, 70]
  }
];