import type { Footer } from '@/payload-types'

// import { FooterMenu } from '@/components/Footer/menu'
// import { LogoSquare } from '@/components/LogoSquare'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import { Dot } from 'lucide-react'
import React, { Suspense } from 'react'
import { Logo } from '@/graphics/logo'

const { COMPANY_NAME, SITE_NAME } = process.env

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()
  const menu = footer.navItems || []
  const currentYear = new Date().getFullYear()

  const copyrightName = COMPANY_NAME || SITE_NAME || ''

  return (
    <footer className="w-full bg-zinc-900 text-zinc-400 py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Logo fill="#fff" />
              {/* <h2 className="text-xl font-bold">YOUR LOGO</h2>
              <p className="text-sm text-zinc-400">YOUR TAGLINE</p> */}
            </div>
            <p className="text-sm max-w-md">
              Fundly is dedicated to providing you with the tools you need to raise money for
              whatever your cause may be.
            </p>
            <ThemeSelector />
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">ABOUT US</h3>
              <ul className="space-y-2">
                {[
                  { text: 'Fundraising Ideas', href: '#' },
                  { text: 'Pricing', href: '#' },
                  { text: 'Privacy Policy', href: '#' },
                  { text: 'About Us', href: '#' },
                  { text: 'Support', href: '#' },
                ].map((link) => (
                  <li key={link.text}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold opacity-0">LINKS</h3>
              <ul className="space-y-2">
                {[
                  { text: 'Blog', href: '#' },
                  { text: 'Terms of Use', href: '#' },
                  { text: 'FAQ', href: '#' },
                  { text: 'Sales', href: '#' },
                  { text: 'Press', href: '#' },
                ].map((link) => (
                  <li key={link.text}>
                    <Link href={link.href} className="text-sm hover:text-white transition-colors">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">FOLLOW US</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="#"
                className="flex items-center space-x-2 text-sm hover:text-white transition-colors"
              >
                <Dot className="h-5 w-5" />
                <span>Facebook</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-2 text-sm hover:text-white transition-colors"
              >
                <Dot className="h-5 w-5" />
                <span>Twitter</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-2 text-sm hover:text-white transition-colors"
              >
                <Dot className="h-5 w-5" />
                <span>Instagram</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-2 text-sm hover:text-white transition-colors"
              >
                <Dot className="h-5 w-5" />
                <span>Google+</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-2 text-sm hover:text-white transition-colors"
              >
                <Dot className="h-5 w-5" />
                <span>LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-2 text-sm hover:text-white transition-colors"
              >
                <Dot className="h-5 w-5" />
                <span>Blog</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-zinc-800 text-center">
          <p className="text-sm">Copyright © Fundly {currentYear}</p>
        </div>
      </div>
    </footer>
    // <footer className="text-sm text-neutral-500 dark:text-neutral-400">
    //   <div className="container">
    //     <div className="flex w-full flex-col gap-6 border-t border-neutral-200 py-12 text-sm md:flex-row md:gap-12 dark:border-neutral-700">
    //       <div>
    //         <Link className="flex items-center gap-2 text-black md:pt-1 dark:text-white" href="/">
    //           <LogoSquare size="sm" />
    //           <span className="uppercase">{SITE_NAME}</span>
    //         </Link>
    //       </div>
    //       <Suspense
    //         fallback={
    //           <div className="flex h-[188px] w-[200px] flex-col gap-2">
    //             <div className={skeleton} />
    //             <div className={skeleton} />
    //             <div className={skeleton} />
    //             <div className={skeleton} />
    //             <div className={skeleton} />
    //             <div className={skeleton} />
    //           </div>
    //         }
    //       >
    //         <FooterMenu menu={menu} />
    //       </Suspense>
    //       <div className="md:ml-auto">
    //         <a
    //           aria-label="Deploy on Vercel"
    //           className="flex mb-4 h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white"
    //           href="https://vercel.com/templates/next.js/nextjs-commerce"
    //         >
    //           <span className="px-3">▲</span>
    //           <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
    //           <span className="px-3">Deploy</span>
    //         </a>
    //         <ThemeSelector />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
    //     <div className="container mx-auto flex w-full flex-col items-center gap-1 md:flex-row md:gap-0">
    //       <p>
    //         &copy; {copyrightDate} {copyrightName}
    //         {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
    //       </p>
    //       <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
    //       <p>Designed in Michigan</p>
    //       <p className="md:ml-auto">
    //         <a className="text-black dark:text-white" href="https://payloadcms.com">
    //           Crafted by ▲ Prayload
    //         </a>
    //       </p>
    //     </div>
    //   </div>
    // </footer>
  )
}
