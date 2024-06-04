import React, { useContext, useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { studyContext } from '@/app/interfaces/studyContext';
import { study } from '@/app/interfaces/study';

interface ImageSelectorProps {
  imageUrl: StaticImageData; // Array of image URLs
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ imageUrl }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [study, setStudy] = useContext<[study,React.Dispatch<any>]>(studyContext);
  const [barPosition, setBarPosition] = useState(0); // New state for bar position
  
  const getBarPositionInPx = () => {
    const step = (dimensions.width-20) / 5; // Assuming there are 5 images
    return Math.min(barPosition * step);

  }
  const moveBar= (direction: string)=>{
    switch(direction){
        case 'left':
            const leftPositon = Math.max(0, barPosition-1);
            study.ImageSelection.set(imageUrl.src, {selection: leftPositon})
            setBarPosition(leftPositon)
            break;
        case 'right':
            const rightPosition = Math.min(barPosition+1, 5);
            study.ImageSelection.set(imageUrl.src, {selection: rightPosition})
            setBarPosition(rightPosition)
            break;
    }


  }

    useEffect(() => {
        if(study.ImageSelection.get(imageUrl.src) === undefined){
            study.ImageSelection.set(imageUrl.src, {selection: 0})
        }else{
            const selection = study.ImageSelection.get(imageUrl.src)?.selection; // Add null check
            if (selection !== undefined) {
                setBarPosition(selection);
            }
        }
    })

const dimensions = {
    width: 1280,
    height: 256
};

  return (
    <div className=' bg-white p-8 rounded-lg shadow-lg '>
      <h1 className='text-2xl font-bold text-gray-800 mb-4'>
        Select an Image that satisfies the requirement:{' '}
        <span className='text-blue-500  outline-2 outline-offset-4 ml-2 outline-black'>Smiling</span>
      </h1>
      <div className={`relative w-[${dimensions.width}px] h-[${dimensions.height}px]`}>
        <Image
          src={imageUrl}
          alt={`Option `}
          width={dimensions.width}
          height={dimensions.height}
          className={`cursor-pointer`}
        />
        <div className='absolute h-full w-1 bg-red-500 top-0 ' style={{left: getBarPositionInPx()}}>
        </div>

      </div>
        <div className='flex justify-evenly'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2' onClick={()=>
                moveBar('left')
                }>
                <Image src={'/previous.svg'} width={20} height={20} alt='previous' />
            </button>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2' onClick={()=>moveBar('right')}>
                <Image src={'/next.svg'} width={20} height={20} alt='Next' />
            </button>

        </div>
    </div>
  );
};

export default ImageSelector;
