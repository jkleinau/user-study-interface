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
        In this study, you will be presented with images that have been misclassified by a machine learning model. Your
        task is to generate visual counterfactual explanations that could help correct the misclassification. This will help
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
    
    </div>
  );
};

export default WelcomePage;