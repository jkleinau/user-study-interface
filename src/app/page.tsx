'use client';
import ImageAnnotater from '@/app/components/ImageAnnotater';
import Wizard from '@/app/components/Wizard';
import WelcomePage from '@/app/components/WelcomePage';
import ImageSelector from '@/app/components/ImageSelector';

import Image1 from '/public/annotations/27300_1.0_misclassified.png';
import Image21 from '/public/annotations/29762_1.0_misclassified.png';


import InstructionsAnnotations from '@/app/components/InstructionsAnnotations';
import SelectionToolExplanationPage from './components/InstructionsSelection';
import StudyResults from './components/StudyResults';

export default function Home() {

  const steps = [
    <WelcomePage key={1} />,
    <SelectionToolExplanationPage key={2} />,
    <ImageSelector key={2} numImages={6} imageId={'27300'} />,
    <ImageSelector key={2} numImages={4} imageId={'29762'} />,
    <ImageAnnotater key={3} imageUrl={Image1} prompt={''} />,
    <InstructionsAnnotations key={2} />,
    <StudyResults key={2} />,
  ]; // Added key prop

  return (
    <main className='flex min-h-screen text-[#e58253] flex-col items-center justify-between p-20 bg-[#d9fafb]'>
        <Wizard steps={steps} />
    </main>
  );
}
