import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ImageBefore from '/public/sequences/27300/0.png'
import ImageAfter from '/public/sequences/27300/3.png'

export default function InstructionsAnnotations() {
  const [showAfterImage, setShowAfterImage] = useState(false);

  const handleButtonClick = () => {
    setShowAfterImage(true);
  };

  return (
    <div className='selection:h-full mt-10 dark:text-black'>
      <h1 className='text-xl mb-16 text-wrap max-w-2xl'>
        Sie können nun vergleichen, ob Sie dieselbe Vorstellung vom Konzept „<span className='font-bold'>Lächeln</span>“ haben wie das KI-Modell. Klicken
        Sie auf die roten Knopf, um die kontrafaktische Erklärung der XAI-Methode zu erzeugen, die die Klassifizierung
        des Modells in „<span className='font-bold'>Lächeln</span>“ ändert.
      </h1>

      <div className='grid grid-cols-3 my-auto space-x-2'>
        <Image src={ImageBefore} alt='Image Before' />
        <button
          className='bg-[#e58253] border border-1 border-[#965335] text-white p-4 rounded-full'
          onClick={handleButtonClick}
        >
          Generate Counterfactual
        </button>
        {showAfterImage ? (
          <motion.div
            initial={{ opacity: 0,  filter: 'blur(20px)' }}
            animate={{ opacity: 1,  filter: 'blur(0px)'}}
            transition={{ duration: 1 }}
          >
            <Image src={ImageAfter} alt='Image After' />
          </motion.div>
        ) : (
          <div style={{ width: '100%', height: '100%' }}></div> // Placeholder to maintain grid structure
        )}
      </div>
    </div>
  )
}
