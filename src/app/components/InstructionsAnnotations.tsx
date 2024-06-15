import React from 'react';
import Image from 'next/image';
import ExplanationGIF from '/public/explanationtask.gif'

export default function InstructionsAnnotations(){

    return (
        <div className="flex selection:h-full mt-10 dark:text-black">
            <div className='max-w-2xl'>
                <h1 className="text-2xl font-bold mb-4">Image Annotation Tool Instructions</h1>
                <p className="mb-4">Welcome to the image annotation task. Here is how you can use the tool:</p>
                <ol className="list-decimal list-inside mb-4">
                    <li className="mb-2">Click on the image to start drawing a polygon. Each click will add a point to the current polygon.</li>
                    <li className="mb-2">
                        Once you have added all the points for a polygon, click the<Image className='inline-block m-1' src={'/enter.svg'} width={20} height={20} alt={''} /> button. This will complete the current polygon.
                    </li>
                    <li className="mb-2">To start drawing a new polygon, simply click on the image again after finishing the previous one.</li>
                    <li className="mb-2">You can use the reset button <Image className='inline-block' src={'/undo.svg'} width={20} height={20} alt={''} /> to reset the annotations if needed.</li>
                </ol>
                <p className="mb-4">Make sure to complete the annotation for all necessary parts of the image.</p>
                <p className="mb-4">When you are ready, click the &quot;next&quot; button below to begin.</p>
            </div>
            <Image src={ExplanationGIF} alt="Annotation Instructions" width={521} height={300} />
        </div>
    );
}
