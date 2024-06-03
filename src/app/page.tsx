'use client'
import ImageAnnotater from "@/app/components/ImageAnnotater";
import Wizard from "@/app/components/Wizard";
import UserForm from "@/app/components/UserForm";
import { useEffect, useState } from "react";
import { studyContext } from "@/app/interfaces/studyContext";
import { v4 as uuidv4 } from "uuid";
import WelcomePage from "@/app/components/WelcomePage";
import { Annotation, study, ImageSelection } from "@/app/interfaces/study";
import ImageSelector from "@/app/components/ImageSelector";

export default function Home() {


const [study, setStudy] = useState<study>( {
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    submittedAt: new Date(),
    ImageAnnotations:  new Map<string, Annotation[]>(),
    ImageSelection: new Map<string, ImageSelection>()
});



  
  const StepTwo = () => <ImageAnnotater imageUrl={'/test1.png'} prompt={""}  />;
  const StepThree = () => <ImageAnnotater imageUrl={'/test2.png'} prompt={""}  />;
 
  const steps = [<WelcomePage key={1} />,<ImageSelector key={2} imageUrl={'/ImageSelector.jpeg'} />, <StepTwo key='step2' />, <StepThree key='step3' />]; // Added key prop

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <ImageAnnotater imageUrl={'/test_imag.webp'}  /> */}
      {/* <h1 className="text-3xl m-4">Visual Conterfactual Explanations</h1> */}
      <studyContext.Provider value={[study, setStudy]}>
        <Wizard steps={steps} />
      </studyContext.Provider>
    </main>
  );
}
