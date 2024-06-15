// components/ImageAnnotator.tsx
'use client';
import React, { useRef, useState, useEffect, MouseEvent, useContext } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Annotation, study, Point } from '@/app/interfaces/study';
import { studyContext } from '@/app/interfaces/studyContext';

interface ImageAnnotatorProps {
  imageUrl: StaticImageData;
  prompt: string;
}

const ImageAnnotator: React.FC<ImageAnnotatorProps> = ({ imageUrl, prompt }) => {
  const [study, setStudy] = useContext(studyContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTool, setCurrentTool] = useState<'Add' | 'Remove' | 'Change'>('Add');
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation>({ tool: 'Add', points: [] });
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [curr, setCurr] = useState<number>(0);

  const addPoint = (event: MouseEvent<HTMLCanvasElement>) => {
    const rect = (event.target as Element).getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const updatedAnnotation: Annotation = {
      tool: currentAnnotation.tool,
      points: [...currentAnnotation.points, { x: offsetX, y: offsetY }]
    };
    // const updatedStudy:study = { ...study };
    // get the currently edited Annotation from
    annotations[curr] = updatedAnnotation;
    study.ImageAnnotations.set(imageUrl.src, annotations);
    // setStudy(updatedStudy);
    setCurrentAnnotation(updatedAnnotation);
    // console.log(updatedAnnotation);
    // console.log(study);
  };

  const finishPolygon = () => {
    if (currentAnnotation.points.length <= 2) return;
    setCurr(curr + 1);
    setCurrentAnnotation({ tool: currentTool, points: [] });
  };

  const undo = () => {
    setCurrentAnnotation({ tool: currentTool, points: [] });
    setAnnotations([]);
    setCurr(0);
    // const updatedStudy = { ...study }
    study.ImageAnnotations.delete(imageUrl.src);
  };

  const toolChange = (tool: 'Add' | 'Remove' | 'Change') => {
    setCurrentTool(tool);
    const updatedStudy: study = { ...study };
    annotations[curr] = { tool: tool, points: currentAnnotation.points };
    study.ImageAnnotations.set(imageUrl.src, annotations);
    setCurrentAnnotation({ tool: tool, points: currentAnnotation.points });
    // console.log(updatedStudy.ImageAnnotations.get(imageUrl.src));
  };

  useEffect(() => {
    console.log('first usesEffect')
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.backgroundColor = 'transparent';
    setAnnotations([]);
    setCurr(0);
    setCurrentAnnotation({ tool: 'Add', points: [] });
    const annotation = study.ImageAnnotations.get(imageUrl.src);
    console.log(imageUrl.src)
    if (annotation) {
      setCurrentTool(annotation[0].tool as 'Add' | 'Remove' | 'Change');
      setAnnotations(annotation);
      setCurrentAnnotation(annotation[0]);
    }
  }, [study.ImageAnnotations, imageUrl.src]);

  useEffect(() => {
    console.log('second useEffect')

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let annotation of annotations) {
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
      // context.setLineDash([5, 5]); // Set the line to be dashed
      context.stroke();
      context.fill();
    }
    // console.log(annotations)
  }, [annotations, currentAnnotation, imageUrl.src, currentTool]);

  const dimensions = { width: 512, height: 512 };

  return (
    <div className='flex-row p-4 rounded-lg dark:text-black  items-center justify-center'>
      <h1 className='text-2xl mb-4 font-bold'>Mark the areas in the Image that need to be changed</h1>
      <div className='h-full p-4 bg-slate-300 shadow-lg border-2 border-blue-800'>
        <div className={`relative w-[${dimensions.width}px] h-[${dimensions.width}px] cursor-crosshair border-2 `}>
          <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            onClick={addPoint}
            className='absolute top-0 left-0'
          />
          <Image
            className=''
            src={imageUrl}
            alt={'Image to be anntoated'}
            width={dimensions.width}
            height={dimensions.height}
          />
          <div className='absolute right-0 top-1/2 transform -translate-y-1/2 space-y-2 p-2 bg-white shadow-lg'>
            <Image onClick={undo} src='/undo.svg' alt='Undo' width={24} height={24} />
            {/* <Image className={currentTool === 'Add' ? 'stroke-blue-500 stroke-2': ''} onClick={()=>toolChange('Add')} src='/add.svg' alt='Undo' width={24} height={24} title='Markiere Bereiche wo etwas hinzugefügt werden soll' />
                        <Image className={currentTool === 'Remove' ? 'stroke-blue-500 stroke-2': ''} onClick={()=>toolChange('Remove')} src='/remove.svg' alt='Undo' width={24} height={24} title='Markiere Bereiche, wo etwas entfernt werden muss' />
                        <Image className={currentTool === 'Change' ? 'stroke-blue-500 stroke-2': ''} onClick={()=>toolChange('Change')} src='/important.svg' alt='Undo' width={24} height={24} title='Markiere Bereiche die relevant sind' /> */}
            <Image
              onClick={() => finishPolygon()}
              src='/enter.svg'
              alt='Undo'
              width={24}
              height={24}
              title='Markiere Bereiche die relevant sind'
            />
          </div>
        </div>
      </div>

      {/* <div className='w-[512px] h-full'>
        <div className='bg-slate-300 p-4 rounded-lg shadow-lg mb-2'>
          <h1 className='text-2xl underline mb-2'>Task</h1>
          <p className='text-wrap'>Mark the areas in the Image that need to be changed, in order for the Image to be classified as <span className='font-bold'>Smiling</span></p>
        </div>
        <div className='bg-slate-300 p-4 rounded-lg shadow-lg mb-2'>
          <h1 className='text-2xl underline mb-2'>Klassifizierung</h1>
          <table className='w-full'>
            <tbody>
              <tr className=''>
                <td className='font-bold'>Soll</td>
                <td className=''>Smiling</td>
              </tr>
              <tr className=''>
                <td className='font-bold'>Ist</td>
                <td>Not Smiling</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default ImageAnnotator;
