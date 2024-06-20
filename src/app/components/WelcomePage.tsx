import React from 'react';
import Image from 'next/image';
const WelcomePage: React.FC = () => {
  return (
    <div className='mt-10 max-w-2xl h-full'>
      <div className='flex mb-4 items-center'>

      <h1 className='text-2xl font-bold text-gray-800 '>
        Welcome to our Study on Visual Counterfactual Explanations!
      </h1>
      <Image src={'/LogoTU.png'} alt={'TU Log'} width={150} height={75} className='ml-auto mb-4' />
      </div>
      <p className='text-gray-700 mb-4'>
        Thank you for participating in our study! We are a group of Master students from the Technical University of
        Berlin (TU Berlin) conducting research on visual counterfactual explanations. Our goal is to understand how
        human-generated visual counterfactuals compare to those produced by machine learning models.
      </p>
      <p className='text-gray-700 mb-4'>
        This study consists of two tasks: image selection and image annotation. In the image selection task, you will be
        asked to choose the image that requires the least amount of change to satisfy a specific criterion. In the image
        annotation task, you will be required to draw polygons on specific areas of the image. This will help
        us gain insights into the differences between human and machine approaches to generating counterfactual
        explanations.
      </p>
      <p className='text-gray-700 mb-4'>
        Your participation is crucial for the success of our research. By contributing your perspectives and creativity,
        you are helping us advance the field of artificial intelligence and human-computer interaction.
      </p>
      <p className='text-gray-700 mb-4'>
        Before we begin, please ensure that you have read and understood the study guidelines and consent form. If you
        have any questions, feel free to reach out to us at any time.
      </p>
      <p className='text-gray-700'>Thank you once again for your valuable contribution to our study!</p>

      <p className='text-gray-700 mt-2 '>If you have any questions, please contact us at: <span className='font-bold'>cederic.assmann@campus.tu-berlin.de</span></p>

    
    </div>
  );
};

export default WelcomePage;