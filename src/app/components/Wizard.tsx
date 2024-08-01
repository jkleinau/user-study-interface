// components/Wizard.tsx
'use client';
import {  useState } from 'react';

interface WizardProps {
  steps: React.ReactNode[];
}

const Wizard: React.FC<WizardProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    // setStudy(study)
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };


  const progress = ((currentStep + 1) / steps.length) * 100; // Calculate progress percentage

  return (
    <div className='w-full h-screen'>
      <div className='bg-goKiBG w-full rounded-lg flex flex-col items-center p-8 h-5/6'>{steps[currentStep]}</div>
      <div className='mt-2 flex justify-between'>
        <div className='mt-4 w-full h-2 bg-gray-200'>
          <div className='h-full bg-goKiAccent' style={{ width: `${progress}%` }}></div> {/* Progress bar */}
        </div>
      </div>
      <div className='mt-2 flex justify-between'>
        {currentStep > 0 ? (
          <button
            className='bg-goKiAccent hover:bg-[#965335] text-white font-bold py-2 px-4 rounded mr-2'
            onClick={prevStep}
          >
            Back
          </button>
        ) : (
          <button className='bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2' disabled>
            Back
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button className='bg-goKiPrimary hover:bg-goKiPrimary text-white font-bold py-2 px-4 rounded' onClick={nextStep}>
            Next
          </button>
        ) : (
          <button className='bg-goKiPrimary text-white hover:bg-goKiPrimary font-bold py-2 px-4 rounded' onClick={()=>setCurrentStep(0)}>
            Zurück zum Anfang
          </button>
        )}
      </div>
    </div>
  );
};

export default Wizard;
