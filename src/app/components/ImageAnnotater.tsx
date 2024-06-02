// components/ImageAnnotator.tsx
'use client'
import React, { useRef, useState, useEffect, MouseEvent, useContext } from 'react';
import Image from 'next/image';
import { Annotation, study, Point } from '@/app/interfaces/study';
import { studyContext } from '@/app/interfaces/studyContext';


interface ImageAnnotatorProps {
    imageUrl: string;
}

const ImageAnnotator: React.FC<ImageAnnotatorProps> = ({ imageUrl }) => {
    const [study, setStudy] = useContext(studyContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentTool, setCurrentTool] = useState<'Add' | 'Remove' | 'Change'>('Add');
    const [currentAnnotation, setCurrentAnnotation] = useState<Annotation>({ tool: 'Add', points: []})
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [curr, setCurr] = useState<number>(0);

    const addPoint = (event: MouseEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = event.nativeEvent;
        const updatedAnnotation: Annotation = {tool: currentAnnotation.tool, points: [...currentAnnotation.points, { x: offsetX, y: offsetY }]}
        const updatedStudy:study = { ...study };
        // get the currently edited Annotation from
        annotations[curr] = updatedAnnotation;
        updatedStudy.ImageAnnotations.set(imageUrl, annotations);
        setCurrentAnnotation(updatedAnnotation);
        // console.log(updatedAnnotation);
        // console.log(study);
    };  

    const finishPolygon = () => {
        setCurr(curr+1)
        setCurrentAnnotation({tool: currentTool,points: []});
    }

    const undo = () => {
        setCurrentAnnotation({tool: currentTool,points: []});
        setAnnotations([]);
        const updatedStudy = { ...study }
        updatedStudy.ImageAnnotations.delete(imageUrl);
    }

    const toolChange = (tool: 'Add' | 'Remove' | 'Change') => {
        setCurrentTool(tool);
        const updatedStudy:study = { ...study };
        annotations[curr] = {tool: tool, points: currentAnnotation.points};
        updatedStudy.ImageAnnotations.set(imageUrl, annotations);
        setCurrentAnnotation({tool: tool, points: currentAnnotation.points});
        // console.log(updatedStudy.ImageAnnotations.get(imageUrl));
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
        setCurrentTool(study.ImageAnnotations.get(imageUrl)[0]?.tool as 'Add' | 'Remove' | 'Change');
        setAnnotations(study.ImageAnnotations.get(imageUrl));
        setCurrentAnnotation(study.ImageAnnotations.get(imageUrl)[0]);
      }

    }, [study.ImageAnnotations, imageUrl]);
    
    useEffect(() => {
        console.log('second useEffect')

      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let annotation of annotations){
          context.beginPath();
          if (annotation.points.length === 0) return;
          context.moveTo(annotation.points[0].x, annotation.points[0].y);
          annotation.points.forEach((point) => {
              context.lineTo(point.x, point.y);
              context.arc(point.x, point.y, 3, 0, Math.PI * 2);
          });
          context.closePath();
          switch (annotation.tool) {
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
          context.stroke();
          context.fill();
      }
      console.log(annotations)

    }, [annotations,currentAnnotation, imageUrl, currentTool]);

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
                <Image onClick={()=>finishPolygon()} src='/enter.svg' alt='Undo' width={24} height={24} title='Markiere Bereiche die relevant sind' />

            </div>
        </div>
    );
};

export default ImageAnnotator;
