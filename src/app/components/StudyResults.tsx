import React from "react";
import Image from 'next/image'
import ResultsSelection from '/public/27300_annot.png'
import ResultsAnnotation from '/public/27300_sel.png'

export default function StudyResults(){
    return(
        <div className='selection:h-full mt-10 dark:text-black inline-block'>
            <h1 className='text-2xl mx-auto mb-16 text-wrap max-w-2xl text-center'>Stimmen Sie mit der Erklärung überein?</h1>          
            <h1 className='text-xl mx-auto mb-16 text-wrap max-w-2xl text-center'>Hier sehen Sie wie Ihre eigene kontrafaktische Erklärung im Vergleich zu anderen Teilnehmenden und der XAI Methode abschneidet.</h1>          
            <div className="grid grid-cols-2">
                <div>
                    <Image className="mb-2" src={ResultsSelection} alt='Image Before' />
                    <p>Die meisten Teilnehmenden stimmen mit der XAI Methode überein (Türkis umrahmtes Bild). Die lächelnde Person, die die Mehrzahl auswählen, ist die gleiche, wie die kontrafaktische Erklärung der XAI Methode.
                    </p>
                </div>
                <div>
                    <Image className="mb-2" src={ResultsAnnotation} alt='Image Before' />
                    <p>Die rot markierten Stellen sind die, die die meisten Teilnehmenden für ein Lächeln verändern wollen.
                    </p>
                </div>
            </div>
        </div>
    )
}