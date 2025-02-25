import * as React from 'react'
import {
  Accordion as AccordionWrapper,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion'
import { AccordionTrigger } from './AccordionTrigger'
import { Slider } from '../Slider'
import { Dish1Icon } from '@/graphics/dish1'
import { Dish2Icon } from '@/graphics/dish2'
import { Dish3Icon } from '@/graphics/dish3'
import { Dish4Icon } from '@/graphics/dish4'
import { Product } from '@/payload-types'

interface AccordionProps {
  product: Product
}

export function Accordion({ product }: AccordionProps) {
  return (
    <AccordionWrapper type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-md font-normal text-gray-500 hover:text-gray-600 pl-2">
          Goes well with
        </AccordionTrigger>
        <AccordionContent className="bg-gray-800 text-white pt-4">
          <div className="flex items-center justify-center gap-4">
            <Dish1Icon />
            <Dish2Icon />
            <Dish3Icon />
            <Dish4Icon />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-md font-normal text-gray-500 hover:text-gray-600 pl-2">
          Taste Profile
        </AccordionTrigger>
        <AccordionContent className="bg-gray-800 text-white pt-4">
          <Slider />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-md font-normal text-gray-500 hover:text-gray-600 pl-2">
          Review
        </AccordionTrigger>
        <AccordionContent className="pt-4">
          <div className="px-8">
            <div className="flex items-center gap-1 mb-2">
              {'★'
                .repeat(5)
                .split('')
                .map((star, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    {star}
                  </span>
                ))}
              <span className="ml-2 text-sm">5.0</span>
            </div>
            <p className="text-sm text-gray-600">
              Its simple and flavour makes it perfect for those of you who like you who want
              minimalist taste <button className="text-zinc-800 font-medium">Read More...</button>
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </AccordionWrapper>
  )
}
