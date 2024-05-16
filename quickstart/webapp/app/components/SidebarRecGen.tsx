import { MenuItem } from "@/types/MenuItemTypes";
import classNames from "@/utils/classNames";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function SidebarRecGen({
                                        menuItems,
                                        disable,
                                      }: {
  menuItems: MenuItem[];
  disable: boolean;
}) {
  const router = useRouter();
  const currentRoute = 'arse';
  return (
    <>
      {menuItems.map((item) =>
        !item.subItems ? (
          <div key={item.name}>
            {/* <Tooltip text="You need to set up an organisation first!"> */}
            <button
              disabled={item.disableable ? disable : false}
              onClick={() => router.push(item.href)}
              className={classNames(
                item.href == currentRoute
                  ? "bg-gray-100 text-gray-900"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                "group w-full flex items-center pl-2 py-2 text-sm  rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              <item.icon
                className={classNames(
                  item.href == currentRoute
                    ? "text-palette-redmid"
                    : "text-gray-400 group-hover:text-gray-500",
                  "mr-3 flex-shrink-0 h-6 w-6"
                )}
                aria-hidden="true"
              />
              {item.name}
            </button>
            {/* </Tooltip> */}
          </div>
        ) : (
          <Disclosure
            as="div"
            key={item.name}
            className="space-y-1"
            defaultOpen={true}
          >
            {({ open }) => (
              <>
                <Disclosure.Button
                  disabled={item.disableable ? disable : false}
                  className={classNames(
                    item.href == currentRoute
                      ? "bg-gray-100 text-gray-900"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm rounded-md focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.href == currentRoute
                        ? "text-palette-redmid"
                        : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  <span className="flex-1">{item.name}</span>
                  <ChevronRightIcon
                    className={classNames(
                      open ? "text-gray-400 rotate-90" : "text-gray-300",
                      "h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400"
                    )}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="space-y-1">
                  {item.subItems?.map((subItem) => (
                    <div key={subItem.href}>
                      {/* <Tooltip text="You need to set up an organisation first!"> */}
                      <Disclosure.Button
                        key={subItem.name}
                        onClick={() => router.push(subItem.href)}
                        disabled={subItem.disableable ? disable : false}
                        as="button"
                        className="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm 
                       text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <subItem.icon
                          className={classNames(
                            subItem.href == currentRoute
                              ? "text-palette-redmid"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-3 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {subItem.name}
                      </Disclosure.Button>
                      {/* </Tooltip> */}
                    </div>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )
      )}
    </>
  );
}
