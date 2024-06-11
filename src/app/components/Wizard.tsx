// components/Wizard.tsx
'use client';
import { useContext, useState } from 'react';
import { studyContext } from '@/app/interfaces/studyContext';
import LoadingModal from '@/app/components/LoadingModal';
import { useRouter } from 'next/navigation';

interface WizardProps {
  steps: React.ReactNode[];
}

const Wizard: React.FC<WizardProps> = ({ steps }) => {
  const [study, setStudy] = useContext(studyContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const nextStep = () => {
    // setStudy(study)
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const finish = () => {
    study.submittedAt = new Date();
    setIsLoading(true);
    setShowModal(true);

    // console.log(study);

    const studyData = {
      ...study,
      ImageAnnotations: Object.fromEntries(study.ImageAnnotations),
      ImageSelection: Object.fromEntries(study.ImageSelection)
    };

    fetch('/api', {
      // Update the fetch URL to use a relative path
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studyData)
    })
      .then((response) => {
        if (response.ok) {
          setSuccess(true);
          setIsLoading(false);
        } else {
          setSuccess(false);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setSuccess(false);
        console.error('Error:', error);
      });
  };

  const progress = ((currentStep + 1) / steps.length) * 100; // Calculate progress percentage

  return (
    <div className='w-full h-screen'>
      <div className='bg-white w-full rounded-lg flex flex-col items-center p-8 h-5/6'>{steps[currentStep]}</div>
      <div className='mt-2 flex justify-between'>
        <div className='mt-4 w-full h-2 bg-gray-200'>
          <div className='h-full bg-blue-500' style={{ width: `${progress}%` }}></div> {/* Progress bar */}
        </div>
      </div>
      <div className='mt-2 flex justify-between'>
        {currentStep > 0 ? (
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
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
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={nextStep}>
            Next
          </button>
        ) : (
          <button className='bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded' onClick={finish}>
            Finish
          </button>
        )}
      </div>
      {showModal && (
        <LoadingModal
          loadingText={'Thank you for Participating'}
          isLoading={isLoading}
          success={success}
          onPrimaryAction={() => {
            router.push('/EndPage');
          }}
          primaryButtonText={'Ok'}
        />
      )}
    </div>
  );
};

export default Wizard;
