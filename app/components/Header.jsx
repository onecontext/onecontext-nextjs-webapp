"use client"
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
]
const callsToAction = [
  { name: 'Quickstart demo', href: 'https://docs.onecontext.ai/quickstart', icon: PlayCircleIcon },
  { name: 'Contact sales', href: 'https://zcal.co/rossamurphy/30min', icon: PhoneIcon },
]
const settings = [
  { name: 'Keys & Credits', description: 'Manage your API keys and your platform credits.', href: '/settings', icon: FingerPrintIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    </header>
  )
}
