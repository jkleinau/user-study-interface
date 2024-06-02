import React, { useState } from "react";
import Image from "next/image";

interface ImageSelectorProps {
    images: string[]; // Array of image URLs
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ images, }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };
    const dimensions = {
        width: 200,
        height: 200,
    };

    return (
        <div className=" bg-white p-8 rounded-lg shadow-lg ">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Select an Image that satisfies the requirement: <span className="text-blue-500  outline-2 outline-offset-4 ml-2 outline-black">Smiling</span></h1>
            <div className="flex space-x-2">
                {images.map((image, index) => (
                    <Image 
                    key={index} 
                    src={image} 
                    alt={`Option ${index + 1}`} 
                    width={dimensions.width}
                    height={dimensions.height}
                    onClick={() => handleImageClick(image)}
                    className={`cursor-pointer ${selectedImage === image ? 'border-4 border-blue-500' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default ImageSelector;