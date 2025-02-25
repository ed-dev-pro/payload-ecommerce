import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/utilities/cn'

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn('flex flex-1 items-center py-4 font-medium transition-all group', className)}
      {...props}
    >
      <div className="relative flex items-center">
        <div className="mr-2">
          <Plus className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:hidden" />
          <Minus className="h-4 w-4 transition-transform duration-200 hidden group-data-[state=open]:block" />
        </div>
        {children}
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))

AccordionTrigger.displayName = 'AccordionTrigger'
