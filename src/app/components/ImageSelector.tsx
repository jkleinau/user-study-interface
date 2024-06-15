import React, { useContext, useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { studyContext } from '@/app/interfaces/studyContext';
import { study } from '@/app/interfaces/study';

interface ImageSelectorProps {
  // imageUrls: StaticImageData[]; // Array of image URLs
  imageId: string;
  numImages: number;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ imageId, numImages }) => {
  const [study, setStudy] = useContext<[study, React.Dispatch<any>]>(studyContext);
  const [selection, setSelection] = useState(0);
  const [imageDimensions, setImageDimensions] = useState({width: 256, height: 256});

  const getImagePaths = (folderName: string, numberOfImages: number) => {
    const images = [];
    for (let i = 0; i < numberOfImages; i++) {
      images.push(`/sequences/${folderName}/${i}.png`);
    }
    return images;
  };

  const imagePaths = getImagePaths(imageId, numImages);

  useEffect(() => {
    if (study.ImageSelection.get(imageId) === undefined) {
      study.ImageSelection.set(imageId, { selection: 0 });
    } else {
      const selectionPrev = study.ImageSelection.get(imageId)?.selection; // Add null check
      if (selectionPrev !== undefined) {
        setSelection(selectionPrev);
      }
    }
  });

  useEffect(() => {
    const calculateImageDimensions = () => {
      const windowWidth = window.innerWidth;
      const imageWidth = Math.floor(windowWidth / numImages) - 20; // subtracting 20 to account for some padding
      const imageHeight = imageWidth; // assuming images are square
      setImageDimensions({width: imageWidth, height: imageHeight});
    };
  
    calculateImageDimensions();
    window.addEventListener('resize', calculateImageDimensions);
  
    return () => {
      window.removeEventListener('resize', calculateImageDimensions);
    };
  }, [numImages]);

  const dimensions = {
    width: 256,
    height: 256
  };

  return (
    <div className=' bg-white p-8 rounded-lg  w-full dark:text-black '>
      <h1 className='text-2xl font-bold text-gray-800 mb-8 text-center'>
        Select the first Image that satisfies the requirement:{' '}
        <span className='text-blue-500  outline-2 outline-offset-4 ml-2 outline-black'>Smiling</span>
      </h1>
      <div className={` w-full flex space-x-1 justify-center`}>
        {imagePaths.map((imagePath, index) => {
          return (
            <Image
              src={imagePath}
              alt={`Option ${index + 1}`}
              width={imageDimensions.width}
              height={imageDimensions.height}
              onClick={() => {
                setSelection(index);
                study.ImageSelection.set(imageId, { selection: index });
              }}
              key={index}
              className={`cursor-pointer ${index === selection ? 'border-4 border-blue-500' : ''}`}
            />
          );
        })}
        {/* <Image
          src={imageUrl}
          alt={`Option `}
          width={dimensions.width}
          height={dimensions.height}
          className={`cursor-pointer mx-auto`}
        /> */}
        {/* <div className='absolute h-full w-1 bg-red-500 top-0 ' style={{left: getBarPositionInPx()}}>
        </div> */}
      </div>
      {/* <div className='flex justify-evenly'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2' onClick={()=>
                moveBar('left')
                }>
                <Image src={'/previous.svg'} width={20} height={20} alt='previous' />
            </button>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2' onClick={()=>moveBar('right')}>
                <Image src={'/next.svg'} width={20} height={20} alt='Next' />
            </button>

        </div> */}
    </div>
  );
};

export default ImageSelector;
