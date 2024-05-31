'use client'
import ImageAnnotater from "@/app/components/ImageAnnotater";
import Wizard from "@/app/components/Wizard";
import UserForm from "@/app/components/UserForm";
import { useState } from "react";
import { studyContext } from "@/app/interfaces/studyContext";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const initalStudy = {
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    submittedAt: new Date(),
    ImageAnnotations: new Map<string, ImageAnnotations>(),
  }
  const [study, setStudy] = useState<study>(initalStudy);
  
  const StepOne = () => <UserForm />;
  const StepTwo = () => <ImageAnnotater imageUrl={'/test.jpg'}  />;
  const StepThree = () => <ImageAnnotater imageUrl={'/test_imag.webp'}  />;
 
  const steps = [<StepOne key="step1" />, <StepTwo key='step2' />, <StepThree key='step3' />]; // Added key prop

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <ImageAnnotater imageUrl={'/test_imag.webp'}  /> */}
      <h1 className="text-3xl m-4">Visual Conterfactual Explanations</h1>
      <studyContext.Provider value={[study, setStudy]}>
        <Wizard steps={steps} />
      </studyContext.Provider>
    </main>
  );
}
