import React from 'react';

const SelectionToolExplanationPage: React.FC = () => {
  return (
    <div className="p-5 rounded-lg mt-10 max-w-2xl h-full dark:text-black">
      <h1 className="text-2xl font-bold mb-4">Image Selection Tool Instructions</h1>
      <p className="mb-4">Welcome to the image selection task. Here is how you can use the tool:</p>
      <ol className="list-decimal list-inside mb-4">
        <li className="mb-2">You will be presented with a row of 4-8 images.</li>
        <li className="mb-2">Each image shows a person with an increasing degree of smiling from left to right, starting with no smile on the far left.</li>
        <li className="mb-2">
          Your task is to select the image with the <span className="font-bold underline">least amount of change necessary</span> to satisfy the requirement of smiling <span className="font-bold underline">in your personal perception</span>.
        </li>
      </ol>
      <p className="mb-4">
        It is important that you choose the image which shows the <span className="font-bold underline">minimum change</span> from the first image that meets the smiling criteria.
      </p>
      <p className="mb-4">Please take your time to carefully observe each image and make your selection.</p>
      <p className="mb-4">When you are ready, click the &quot;Next&quot; button below to begin.</p>
 
    </div>
  );
};

export default SelectionToolExplanationPage;
