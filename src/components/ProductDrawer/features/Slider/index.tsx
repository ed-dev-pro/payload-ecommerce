import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/utilities/cn'

const SliderContent = ({ scale }) => (
  <>
    <div className="flex justify-between text-xs text-white mb-1">
      <span>{scale.leftLabel}</span>
      <span>{scale.rightLabel}</span>
    </div>
    <div className="relative">
      <div className="absolute w-full top-1/2 border-t border-dotted border-white/30" />
      <SliderPrimitive.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={[scale.value]}
        max={scale.max}
        min={scale.min}
        step={1}
        // onValueChange={(value) => onChange(index, value[0])}
      >
        <SliderPrimitive.Track className="relative h-0.5 grow">
          <SliderPrimitive.Range className="absolute h-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            'block h-3 w-6 rounded-full bg-white',
            'focus:outline-none focus-visible:ring focus-visible:ring-white/75',
            'disabled:pointer-events-none disabled:opacity-50',
          )}
        />
      </SliderPrimitive.Root>
    </div>
  </>
)

export function Slider() {
  const [scales, setScales] = React.useState([
    {
      name: 'boldness',
      min: 0,
      max: 10,
      value: 5,
      label: '',
      leftLabel: 'Light',
      rightLabel: 'Bold',
    },
    {
      name: 'sweetness',
      min: 0,
      max: 10,
      value: 3,
      label: '',
      leftLabel: 'Dry',
      rightLabel: 'Sweet',
    },
    {
      name: 'aftertaste',
      min: 0,
      max: 10,
      value: 7,
      label: '',
      leftLabel: 'Short',
      rightLabel: 'Long',
    },
  ])
  // const onChange = (index: number, value: number) => {
  //   setScales((prevScales) => {
  //     const newScales = [...prevScales]
  //     newScales[index] = { ...newScales[index], value }
  //     return newScales
  //   })

  //   // You can also handle the value change here
  //   console.log(`Scale ${index} changed to ${value}`)
  // }

  return (
    <div className="w-full px-12 space-y-8">
      <div className="relative">
        <SliderContent scale={scales[0]} />
        <SliderContent scale={scales[1]} />
        {/* <div className="text-center text-sm text-white">Aftertaste</div> */}
        <SliderContent scale={scales[2]} />
      </div>
    </div>
  )
}

// import { Slider } from '@/components/ui/slider'

// export const MobileSlider = () => {
//   return (
//     <div className="flex flex-col gap-6 px-16 py-4">
//       {/* Light - Bold */}
//       <div className="flex flex-col">
//         <div className="flex justify-between text-sm text-gray-300">
//           <span>Light</span>
//           <span>Bold</span>
//         </div>
//         <Slider defaultValue={[80]} max={100} className="mt-2 custom-slider" />
//       </div>

//       {/* Dry - Sweet */}
//       <div className="flex flex-col">
//         <div className="flex justify-between text-sm text-gray-300">
//           <span>Dry</span>
//           <span>Sweet</span>
//         </div>
//         <Slider defaultValue={[40]} max={100} className="mt-2 custom-slider" />
//       </div>

//       {/* Short - Long (with "Aftertaste" in the center) */}
//       <div className="flex flex-col">
//         <div className="flex justify-between text-sm text-gray-300 relative">
//           <span>Short</span>
//           <span className="absolute left-1/2 -translate-x-1/2 font-bold">Aftertaste</span>
//           <span>Long</span>
//         </div>
//         <Slider defaultValue={[20]} max={100} className="mt-2 custom-slider" />
//       </div>
//     </div>
//   )
// }
