import { Home, CalendarDays, ClipboardList, CalendarClock, Package, Pill, FlaskConical, FileText, Settings, LogOut, } from 'lucide-react';

import { SideNavItem } from './types';
import { Roles } from './role.enum';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'หน้าหลัก',
    path: '/Main',
    icon: <Home />,
    role: [],
  },
  {
    title: 'ทะเบียน',
    path: '/Registrations',
    icon: <ClipboardList />,
    submenu: true,
    subMenuItems: [
      { title: 'ลงทะเบียน', path: '/Registrations' },
      { title: 'ผู้ป่วยทั้งหมด', path: '/Registrations/Patients' },
    ],
    role: [],
  },
  {
    title: 'ตารางนัดหมาย',
    path: '/Calendar',
    icon: <CalendarClock />,
    role: [],
  },
  {
    title: 'ปฏิทินเวรแพทย์',
    path: '/WorkDays',
    icon: <CalendarDays />,
    role: [],
  },
  {
    title: 'คลังจัดเก็บ',
    path: '/Warehouse',
    icon: <Package />,
    submenu: true,
    subMenuItems: [
      { title: 'เวชภัณฑ์', path: '/Warehouse/Medicines' },
      { title: 'สินค้า', path: '/projects/Products' },
    ],
    role: [],
  },
  {
    title: 'รายการแล็ป',
    path: '/Labs',
    icon: <FlaskConical />,
    role: [],
  },
  {
    title: 'รายงาน',
    path: '/Reports',
    icon: <FileText />,
    role: [],
  },
  {
    title: 'รายงานค่าตอบแทน',
    path: '/DFReports',
    icon: <FileText />,
    role: [],
  },
  {
    title: 'ตั้งค่า',
    path: '/Settings',
    icon: <Settings />,
    role: [],
  },
];
