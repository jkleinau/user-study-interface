// components/ImageAnnotator.tsx
'use client'
import React, { useRef, useState, useEffect, MouseEvent, useContext } from 'react';
import Image from 'next/image';
import { studyContext } from '@/app/interfaces/studyContext';


interface ImageAnnotatorProps {
    imageUrl: string;
}

const ImageAnnotator: React.FC<ImageAnnotatorProps> = ({ imageUrl }) => {
    const [study, setStudy] = useContext(studyContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentAnnotation, setCurrentAnnotation] = useState<Point[]>([]);
    const [currentTool, setCurrentTool] = useState<'Add' | 'Remove' | 'Change'>('Add');

    const addPoint = (event: MouseEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = event.nativeEvent;
        const updatedAnnotation = [...currentAnnotation, { x: offsetX, y: offsetY }];
        const updatedStudy = { ...study };
        updatedStudy.ImageAnnotations.set(imageUrl, { tool: currentTool, points: updatedAnnotation });
        setCurrentAnnotation(updatedAnnotation);
        // console.log(updatedAnnotation);
        // console.log(study);
    };

    const undo = () => {
        setCurrentAnnotation([]);
        const updatedStudy = { ...study }
        updatedStudy.ImageAnnotations.delete(imageUrl);
    }

    const toolChange = (tool: 'Add' | 'Remove' | 'Change') => {
        setCurrentTool(tool);
        const updatedStudy = { ...study };
        updatedStudy.ImageAnnotations.set(imageUrl, { tool: tool, points: currentAnnotation });
        console.log(updatedStudy.ImageAnnotations.get(imageUrl));
    }

    useEffect(() => {
        console.log('first useEffect')
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.backgroundColor = 'transparent';
      if (study.ImageAnnotations.has(imageUrl)) {
        setCurrentTool(study.ImageAnnotations.get(imageUrl)?.tool as 'Add' | 'Remove' | 'Change');
        setCurrentAnnotation(study.ImageAnnotations.get(imageUrl)?.points as Point[]);
      }

    }, [study.ImageAnnotations, imageUrl]);
    
    useEffect(() => {
        console.log('second useEffect')

      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      context.beginPath();
      if (currentAnnotation.length === 0) return;
      context.moveTo(currentAnnotation[0].x, currentAnnotation[0].y);
      currentAnnotation.forEach((point) => {
          context.lineTo(point.x, point.y);
          context.arc(point.x, point.y, 3, 0, Math.PI * 2);
      });
      context.closePath();
      switch (currentTool) {
        case 'Add':
          context.strokeStyle = 'rgba(0, 0, 255, 1)';
          context.fillStyle = 'rgba(0, 0, 255, 0.1)';
          break;
        case 'Remove':
          context.strokeStyle = 'rgba(255, 0, 0, 1)';
          context.fillStyle = 'rgba(255, 0, 0, 0.1)';
          break;
        case 'Change':
          context.strokeStyle = 'rgba(0, 255, 0, 1)';
          context.fillStyle = 'rgba(0, 255, 0, 0.1)';
          break;
      }
    //   context.strokeStyle = 'rgba(255, 0, 0, 1)';
    //   context.fillStyle = 'rgba(255, 0, 0, 0.1)';
      context.stroke();
      context.fill();

    }, [currentAnnotation, imageUrl, currentTool]);

    return (
        <div className='relative border-2 w-[800px] h-[600px] cursor-crosshair'>
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                onClick={addPoint}
               className='absolute top-0 left-0'
            />
            <Image className='' src={imageUrl} alt={'Image to be anntoated'} width={800} height={600}/>
            <div className='absolute right-0 top-1/2 transform -translate-y-1/2 space-y-2 p-2 bg-white shadow-lg'>
                <Image onClick={undo} src='/undo.svg' alt='Undo' width={24} height={24} />
                <Image onClick={()=>toolChange('Add')} src='/add.svg' alt='Undo' width={24} height={24} title='Markiere Bereiche wo etwas hinzugefügt werden soll' />
                <Image onClick={()=>toolChange('Remove')} src='/remove.svg' alt='Undo' width={24} height={24} title='Markiere Bereiche, wo etwas entfernt werden muss' />
                <Image onClick={()=>toolChange('Change')} src='/important.svg' alt='Undo' width={24} height={24} title='Markiere Bereiche die relevant sind' />
            </div>
        </div>
    );
};

export default ImageAnnotator;
