// components/Wizard.tsx
'use client'
import { useState } from 'react';

interface WizardProps {
    steps: React.ReactNode[];
}

const Wizard: React.FC<WizardProps> = ({ steps }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const progress = ((currentStep + 1) / steps.length) * 100; // Calculate progress percentage

    return (
        <div>
            <div>{steps[currentStep]}</div>
            <div className='mt-2 flex justify-between'>
                <div className='w-full h-2 bg-gray-200'>
                    <div className='h-full bg-blue-500' style={{ width: `${progress}%` }}></div> {/* Progress bar */}
                </div>
            </div>
            <div className='mt-2 flex justify-between'>
                {currentStep > 0 ? (
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2' onClick={prevStep}>
                        Back
                    </button>
                ) : (
                    <button className='bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2' disabled>
                        Back
                    </button>
                )}
                {currentStep < steps.length - 1 ? (
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={nextStep}>
                        Next
                    </button>
                ) : (
                    <button className='bg-gray-500 text-white font-bold py-2 px-4 rounded' disabled>
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Wizard;
