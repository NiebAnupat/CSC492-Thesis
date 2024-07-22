'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SIDENAV_ITEMS } from '@/constants';
import { SideNavItem } from '@/types';
import { ChevronDown, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const SideNav = () => {
  return (
    // Sidenav Container
    <aside className="md:w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col space-y-6 w-full">
        {/* Username and Role */}
        <div className='flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-16 w-full'>
          <div className="h-8 w-fit flex gap-2 items-center justify-center text-center">
            <Avatar className='w-8 h-full bg-gray-200 rounded-full flex items-center justify-center text-lg font-semibold'>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className='text-sm'>SK</AvatarFallback>
            </Avatar>

            {/* Username and role */}
            <div className="flex flex-col text-start">
              <p className="text-md font-semibold">สุชานาถ คุ้มบุ่งคล้า</p>
              <p className="text-sm text-gray-500">ทันตแพทย์</p>
            </div>
          </div>
        </div>

        {/* Sidenav Items */}
        <div className="flex flex-col space-y-2 md:px-6 ">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}

        </div>

        {/* Logout Button */}
        <button className="absolute bottom-1 w-full flex flex-row space-x-4 md:px-8 items-center p-2 hover:bg-zinc-100 whitespace-nowrap rounded-md">
          <LogOut />
          <span className="flex">ออกจากระบบ</span>
        </button>
      </div>
    </aside>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    // Sidenav Item
    <div className="">
      {item.submenu ? (
        <>
          {/* Main Item */}
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${pathname.includes(item.path) ? 'bg-zinc-100' : ''
              }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
              <ChevronDown />
            </div>
          </button>

          {/* Submenu Items Only show if submenu is open*/}
          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={'/Owner'+subItem.path}
                    className={`${subItem.path === pathname ? 'font-bold' : ''
                      }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        // Single Item
        <Link
          href={'/Owner'+item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${item.path === pathname ? 'bg-zinc-100' : ''
            }`}
        >
          {item.icon}
          <span className="flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
