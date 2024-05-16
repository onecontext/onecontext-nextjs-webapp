import SidebarSlider from "@/components/SidebarSlider";
import SidebarStatic from "@/components/SidebarStatic";
import { MenuItem } from "@/types/MenuItemTypes";
import {
  Bars3CenterLeftIcon,
  Cog8ToothIcon,
  HomeIcon,
  HomeModernIcon,
  MagnifyingGlassIcon,
  ServerStackIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

const mItems: MenuItem[] = [
  {
    name: "Home",
    href: "/home",
    icon: HomeIcon,
    disableable: false,
  },
  {
    name: "Question History",
    href: "/questions",
    icon: MagnifyingGlassIcon,
    disableable: true,
  },
  {
    name: "Destinations",
    href: "/destinations",
    icon: ServerStackIcon,
    disableable: true,
  },
  // {
  //   name: "dbt Projects",
  //   href: "/dbt",
  //   icon: CubeTransparentIcon,
  //   disableable: true,
  // },
  {
    name: "Organisation",
    href: "/organisation",
    icon: HomeModernIcon,
    disableable: true,
    subItems: [
      {
        name: "Users",
        href: "/organisation/users",
        icon: UserIcon,
        disableable: true,
      },
      {
        name: "Settings",
        href: "/organisation/settings",
        icon: Cog8ToothIcon,
        disableable: true,
      },
    ],
  },
];

export default function Sidebar({ disable }: { disable: boolean }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-full">
      {/* Slider sidebar for mobile */}
      <SidebarSlider
        mItems={mItems}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        disable={disable}
      />

      {/* Static sidebar for desktop */}
      <SidebarStatic mItems={mItems} disable={disable} />

      {/* Main column */}
      <div className="flex flex-col lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:hidden">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
