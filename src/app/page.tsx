'use client';
import ImageAnnotater from '@/app/components/ImageAnnotater';
import Wizard from '@/app/components/Wizard';
import UserForm from '@/app/components/UserForm';
import Instructions from '@/app/components/InstructionsAnnotations';
import { useEffect, useState } from 'react';
import { studyContext } from '@/app/interfaces/studyContext';
import { v4 as uuidv4 } from 'uuid';
import WelcomePage from '@/app/components/WelcomePage';
import { Annotation, study, ImageSelection } from '@/app/interfaces/study';
import ImageSelector from '@/app/components/ImageSelector';

import Image1 from '/public/annotations/27300_1.0_misclassified.png';
import Image2 from '/public/annotations/27398_1.0_misclassified.png';
import Image3 from '/public/annotations/27591_1.0_misclassified.png';
import Image4 from '/public/annotations/27611_1.0_misclassified.png';
import Image5 from '/public/annotations/27931_1.0_misclassified.png';
import Image6 from '/public/annotations/28113_1.0_misclassified.png';
import Image7 from '/public/annotations/28125_1.0_misclassified.png';
import Image8 from '/public/annotations/28285_1.0_misclassified.png';
import Image9 from '/public/annotations/28354_1.0_misclassified.png';
import Image10 from '/public/annotations/28355_1.0_misclassified.png';
import Image11 from '/public/annotations/28362_1.0_misclassified.png';
import Image12 from '/public/annotations/28383_1.0_misclassified.png';
import Image13 from '/public/annotations/28583_1.0_misclassified.png';
import Image14 from '/public/annotations/28670_1.0_misclassified.png';
import Image15 from '/public/annotations/28782_1.0_misclassified.png';
import Image16 from '/public/annotations/28892_1.0_misclassified.png';
import Image17 from '/public/annotations/29058_1.0_misclassified.png';
import Image18 from '/public/annotations/29188_1.0_misclassified.png';
import Image19 from '/public/annotations/29408_1.0_misclassified.png';
import Image20 from '/public/annotations/29527_1.0_misclassified.png';
import Image21 from '/public/annotations/29762_1.0_misclassified.png';


import InstructionsAnnotations from '@/app/components/InstructionsAnnotations';
import SelectionToolExplanationPage from './components/InstructionsSelection';

export default function Home() {
  const [study, setStudy] = useState<study>({
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    submittedAt: new Date(),
    ImageAnnotations: new Map<string, Annotation[]>(),
    ImageSelection: new Map<string, ImageSelection>()
  });

  const steps = [
    <WelcomePage key={1} />,
    <SelectionToolExplanationPage key={2} />,
    <ImageSelector key={2} numImages={6} imageId={'27300'} />,
    <ImageSelector key={2} numImages={6} imageId={'27398'} />,
    <ImageSelector key={2} numImages={6} imageId={'27591'} />,
    <ImageSelector key={2} numImages={5} imageId={'27931'} />,
    <ImageSelector key={2} numImages={4} imageId={'28113'} />,
    <ImageSelector key={2} numImages={9} imageId={'28125'} />,
    <ImageSelector key={2} numImages={4} imageId={'28285'} />,
    <ImageSelector key={2} numImages={8} imageId={'28362'} />,
    <ImageSelector key={2} numImages={5} imageId={'28383'} />,
    <ImageSelector key={2} numImages={8} imageId={'28583'} />,
    <ImageSelector key={2} numImages={8} imageId={'28782'} />,
    <ImageSelector key={2} numImages={8} imageId={'28892'} />,
    <ImageSelector key={2} numImages={6} imageId={'29058'} />,
    <ImageSelector key={2} numImages={8} imageId={'29188'} />,
    <ImageSelector key={2} numImages={7} imageId={'29408'} />,
    <ImageSelector key={2} numImages={5} imageId={'29527'} />,
    <ImageSelector key={2} numImages={4} imageId={'29762'} />,
    <InstructionsAnnotations key={2} />,
    <ImageAnnotater key={3} imageUrl={Image1} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image2} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image3} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image4} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image5} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image6} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image7} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image8} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image9} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image10} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image11} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image12} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image13} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image14} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image15} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image16} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image17} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image18} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image19} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image20} prompt={''} />,
    <ImageAnnotater key={3} imageUrl={Image21} prompt={''} />,
  ]; // Added key prop

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-20 bg-gray-300'>
      {/* <ImageAnnotater imageUrl={'/test_imag.webp'}  /> */}
      {/* <h1 className="text-3xl m-4">Visual Conterfactual Explanations</h1> */}
      <studyContext.Provider value={[study, setStudy]}>
        <Wizard steps={steps} />
      </studyContext.Provider>
    </main>
  );
}
