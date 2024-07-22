import { Home, CalendarDays, ClipboardList, CalendarClock, Package, Pill, FlaskConical, FileText, Settings, LogOut, } from 'lucide-react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'หน้าหลัก',
    path: '/Main',
    icon: <Home />,
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
  },
  {
    title: 'ตารางนัดหมาย',
    path: '/Calendar',
    icon: <CalendarClock />,
  },
  {
    title: 'ปฏิทินเวรแพทย์',
    path: '/WorkDays',
    icon: <CalendarDays />,
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
  },
  {
    title: 'รายการแล็ป',
    path: '/Labs',
    icon: <FlaskConical />,
  },
  {
    title: 'รายงาน',
    path: '/Reports',
    icon: <FileText />,
  },
  {
    title: 'รายงานค่าตอบแทน',
    path: '/DFReports',
    icon: <FileText />,
  },
  {
    title: 'ตั้งค่า',
    path: '/Settings',
    icon: <Settings />,
  },
];
