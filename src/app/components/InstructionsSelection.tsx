import React from 'react';
import Image from 'next/image';
import Image1 from '/public/annotations/27300_1.0_misclassified.png';
const SelectionToolExplanationPage: React.FC = () => {

  return (
    <div className="p-5 rounded-lg mt-10 max-w-2xl h-full dark:text-black">
      <p className='mb-8 text-xl'>
        Das Modell hat die Person im Bild als <span className='font-bold'>nicht lächelnd</span> klassifiziert. Was muss sich, Ihrer Meinung nach, verändern, dass die Person als <span className='font-bold'>lächelnd</span> klassifiziert werden kann?
      </p>

      <Image src={Image1} alt={'Person nicht lächelnd'} width={300} height={300} className='mx-auto mb-4' />
    </div>
  );
};

export default SelectionToolExplanationPage;
