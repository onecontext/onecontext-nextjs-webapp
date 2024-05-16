import SidebarRecGen from "@/components/SidebarRecGen";
import { MenuItem } from "@/types/MenuItemTypes";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function SidebarStatic({
  disable,
  mItems,
}: {
  disable: boolean;
  mItems: MenuItem[];
}) {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pt-5 lg:pb-4">

      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="mt-0 flex h-0 flex-1 flex-col overflow-y-auto pt-1">

        {/* Navigation */}
        <nav className="mt-4 px-3 space-y-1">
          <SidebarRecGen menuItems={mItems} disable={disable} />
        </nav>
        {/* Contact us button at the bottom */}
      </div>
      <div>
        <Link
          className="bg-gray-100 text-gray-600 hover:bg-gray-50 hover:text-gray-900 group w-full flex items-center pl-6 py-2 text-sm"
          href="mailto:hello@engraph.ai?subject=Engraph%20Support"
          target="_blank"
        >
          <ChatBubbleLeftEllipsisIcon className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
          Contact Us
        </Link>
        {/* </Tooltip> */}
      </div>
    </div>
  );
}
