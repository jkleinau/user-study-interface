import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface ImageSelectorProps {
  // imageUrls: StaticImageData[]; // Array of image URLs
  imageId: string
  numImages: number
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ imageId, numImages }) => {
  const [selection, setSelection] = useState(0)
  const [imageDimensions, setImageDimensions] = useState({ width: 256, height: 256 })

  const getImagePaths = (folderName: string, numberOfImages: number) => {
    const images = []
    for (let i = 0; i < numberOfImages; i++) {
      images.push(`/sequences/${folderName}/${i}.png`)
    }
    return images
  }

  const imagePaths = getImagePaths(imageId, numImages)

  useEffect(() => {
    const calculateImageDimensions = () => {
      const windowWidth = window.innerWidth
      const imageWidth = Math.floor(windowWidth / numImages) - 20 // subtracting 20 to account for some padding
      const imageHeight = imageWidth // assuming images are square
      setImageDimensions({ width: imageWidth, height: imageHeight })
    }

    calculateImageDimensions()
    window.addEventListener('resize', calculateImageDimensions)

    return () => {
      window.removeEventListener('resize', calculateImageDimensions)
    }
  }, [numImages])

  const dimensions = {
    width: 256,
    height: 256
  }

  return (
    <div className='flex p-8 rounded-lg  w-full dark:text-black items-center justify-center flex-col'>
      <h1 className='text-xl  mb-16 text-center '>
        Diese Bilderreihe zeigt ganz links das Originalbild. Die Bilder rechts davon sind AI generierte Bilder, in denen
        das Merkmal “<span className='font-bold'>Lächeln</span>” stufenweise intensiviert wurde. Wählen Sie, das von
        links aus, erste Bild in dem die Person, Ihrer Meinung nach, <span className='font-bold'>lächelt</span>.
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
                setSelection(index)
              }}
              key={index}
              className={`cursor-pointer ${index === selection ? 'border-4 border-goKiPrimary' : ''}`}
            />
          )
        })}
      </div>
      <button
        onClick={() => {
          setSelection(-1)
        }}
        className={`px-4 py-2 rounded mt-4 font-bold ${
          selection === -1
            ? 'bg-goKiPrimary border-4 border-goKiAccent text-white'
            : 'bg-white text-black opacity-70 hover:opacity-100 hover:ring-2 ring-gobg-goKiPrimary'
        }`}
      >
        None is smiling
      </button>
    </div>
  )
}

export default ImageSelector
