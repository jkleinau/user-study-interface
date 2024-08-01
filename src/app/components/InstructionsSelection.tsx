import React from 'react';
const SelectionToolExplanationPage: React.FC = () => {
  const images = [
    '/annotations/27300_1.0_misclassified.png',
    '/annotations/27398_1.0_misclassified.png',
    '/annotations/27591_1.0_misclassified.png',
    '/annotations/27611_1.0_misclassified.png',
    '/annotations/27931_1.0_misclassified.png',
  ];

  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];

  return (
    <div className="p-5 rounded-lg mt-10 max-w-2xl h-full dark:text-black">
      <p className='mb-8 text-xl'>
        Das Modell hat die Person im Bild als <span className='font-bold'>nicht lächelnd</span> klassifiziert. Was muss sich, Ihrer Meinung nach, verändern, dass die Person als <span className='font-bold'>lächelnd</span> klassifiziert werden kann?
      </p>

      <img src={randomImage} alt={'Person nicht lächelnd'} width={300} height={300} className='mx-auto mb-4' />
    </div>
  );
};

export default SelectionToolExplanationPage;
