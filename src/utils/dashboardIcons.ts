import {
  // System & Performance
  Cpu,
  HardDrive,
  Server,
  Activity,
  Signal,
  Wifi,
  Battery,
  Gauge,
  Thermometer,
  
  // Business & Analytics
  Users,
  UserCheck,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  ShoppingBag,
  Package,
  Truck,
  
  // Time & Schedule
  Clock,
  Calendar,
  Timer,
  Hourglass,
  
  // Communication
  Mail,
  MessageSquare,
  Phone,
  Bell,
  
  // Security
  Shield,
  Lock,
  Key,
  AlertCircle,
  
  // Weather & Environment
  Cloud,
  Sun,
  Wind,
  Droplets
} from 'lucide-react';

export const iconCategories = [
  {
    name: 'System & Performance',
    icons: [
      { icon: Cpu, label: 'CPU' },
      { icon: HardDrive, label: 'Storage' },
      { icon: Server, label: 'Memory' },
      { icon: Server, label: 'Server' },
      { icon: Activity, label: 'Activity' },
      { icon: Signal, label: 'Signal' },
      { icon: Wifi, label: 'Network' },
      { icon: Battery, label: 'Battery' },
      { icon: Gauge, label: 'Performance' },
      { icon: Thermometer, label: 'Temperature' }
    ]
  },
  {
    name: 'Business & Analytics',
    icons: [
      { icon: Users, label: 'Users' },
      { icon: UserCheck, label: 'Active Users' },
      { icon: DollarSign, label: 'Revenue' },
      { icon: TrendingUp, label: 'Trends' },
      { icon: ShoppingCart, label: 'Cart' },
      { icon: ShoppingBag, label: 'Sales' },
      { icon: Package, label: 'Products' },
      { icon: Truck, label: 'Delivery' }
    ]
  },
  {
    name: 'Time & Schedule',
    icons: [
      { icon: Clock, label: 'Time' },
      { icon: Calendar, label: 'Date' },
      { icon: Timer, label: 'Duration' },
      { icon: Hourglass, label: 'Processing' }
    ]
  },
  {
    name: 'Communication',
    icons: [
      { icon: Mail, label: 'Email' },
      { icon: MessageSquare, label: 'Messages' },
      { icon: Phone, label: 'Calls' },
      { icon: Bell, label: 'Notifications' }
    ]
  },
  {
    name: 'Security',
    icons: [
      { icon: Shield, label: 'Protection' },
      { icon: Lock, label: 'Security' },
      { icon: Key, label: 'Access' },
      { icon: AlertCircle, label: 'Alerts' }
    ]
  },
  {
    name: 'Weather & Environment',
    icons: [
      { icon: Cloud, label: 'Cloud' },
      { icon: Sun, label: 'Temperature' },
      { icon: Wind, label: 'Wind' },
      { icon: Droplets, label: 'Humidity' }
    ]
  }
];