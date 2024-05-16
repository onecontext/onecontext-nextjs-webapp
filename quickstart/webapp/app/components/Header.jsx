"use client"
import { MoonIcon, SunIcon} from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from '@/utils/themeContext'; 
import Image from 'next/image'

import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  CpuChipIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {ChevronRightIcon} from "@heroicons/react/24/solid";
import Link from "next/link";

const products = [
  { name: 'Serverless', description: 'Pay for what you use. No monthly fee. State of the art, on demand.', href: '/serverless', icon: CpuChipIcon },
  // { name: 'Dedicated', description: 'Custom GPU clusters deployed anywhere you want.', href: '/plans', icon: CursorArrowRaysIcon },
  // { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  // { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  // { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Quickstart demo', href: 'https://docs.onecontext.ai/quickstart', icon: PlayCircleIcon },
  { name: 'Contact sales', href: 'https://zcal.co/rossamurphy/30min', icon: PhoneIcon },
]
const settings = [
  { name: 'Keys & Credits', description: 'Manage your API keys and your platform credits.', href: '/settings', icon: FingerPrintIcon },
  // { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  // { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  // { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const {theme, toggleTheme} = useTheme();

  return (
    <header className={"border border-black mx-[1vw] xl:mx-[10vw] lg:mx-[10vw] md:mx-[1vw] sm:mx-[1vw] my-4 rounded-3xl bg-gradient-to-r from-neutral-100 to-neutral-200 py-2 z-500 "}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8" aria-label="Global">
        <div className="flex-1">
          <Link href="/" className="">
            <span className="sr-only">OneContext</span>
            <Image className="border-amber-100 rounded-3xl mr-4" alt="oclogo" width={32} height={32}
                   src="/onecontext2.png"/>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
          </button>
        </div>
      </nav>
      <Dialog as="div" className="z-500" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(!mobileMenuOpen)} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <div className="fixed inset-0"/>
        <Dialog.Panel
          className="fixed inset-y-0 mt-28 z-500 w-full bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
          <div className="mt-0 z-500">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({open}) => (
                    <>
                      <Disclosure.Button
                        className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Product
                        <ChevronRightIcon
                          className={classNames(open ? 'rotate-90' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                <Disclosure as="div" className="-mx-3">
                  {({open}) => (
                    <>
                      <Disclosure.Button
                        className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Company
                        <ChevronRightIcon
                          className={classNames(open ? 'rotate-90' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {settings.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>
          <div
            className="relative inset-y-0 right-0 flex items-center pr-2 ">

            {/*theme provider*/}
            {/*<div>*/}
            {/*  <button onClick={toggleTheme}>*/}
            {/*  {theme === 'dark' ? <SunIcon className="h-6 w-6 mr-2 text-dsand-100"/> : <MoonIcon className="h-6 w-6 mr-2 text-dsand-100"/>}*/}
            {/*  </button> */}
            {/*</div>*/}

          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
