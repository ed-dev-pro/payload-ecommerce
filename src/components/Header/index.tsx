import { CMSLink } from '@/components/Link'
import { Cart } from '@/components/Cart'
import { OpenCart } from '@/components/Cart/OpenCart'
import Link from 'next/link'
import React, { Suspense } from 'react'

import { MobileMenu } from './mobile-menu'
import type { Header } from 'src/payload-types'

import AccountDrawer from '@/components/AccountDrawer'
import { ProductDrawer } from '@/components/ProductDrawer'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Logo } from '@/graphics/logo'

export async function Header() {
  const header: Header = await getCachedGlobal('header', 1)()
  const menu = header.navItems || []

  return (
    <div className="container mx-auto">
      <nav className="relative z-20 flex items-center justify-between py-4">
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>
        <div className="flex w-full items-center">
          <div className="flex w-full justify-between mr-0 md:mr-16">
            <Link className="flex w-full items-center justify-center md:w-auto" href="/">
              <Logo />
            </Link>
            {menu.length ? (
              <ul className="hidden gap-6 text-sm md:flex md:items-center">
                {menu.map((item) => (
                  <li key={item.id}>
                    <CMSLink {...item.link} appearance="link" />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="flex justify-end gap-2 md:gap-4">
            <Suspense fallback={null}>
              <ProductDrawer />
            </Suspense>
            <Suspense fallback={<OpenCart />}>
              <AccountDrawer />
            </Suspense>
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </nav>
    </div>
  )
}
