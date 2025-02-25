import clsx from 'clsx'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

export function OpenCart({ className, quantity }: { className?: string; quantity?: number }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md text-gray-500 transition-colors dark:border-neutral-700 dark:bg-black dark:text-white">
      <ShoppingCart
        className={clsx('h-6 transition-all ease-in-out hover:scale-110 ', className)}
      />

      {quantity ? (
        <div className="absolute right-2 top-2 -mr-2 -mt-2 h-4 w-4 rounded bg-zinc-800 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  )
}
