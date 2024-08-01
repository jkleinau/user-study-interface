import React from 'react'
const WelcomePage: React.FC = () => {
  return (
    <div className='mt-10 max-w-2xl h-full'>
      <div className='flex mb-4 items-center'>
        <h1 className='text-2xl font-bold '>Kontrafaktische Erklärungen</h1>
      </div>
      <p className='mb-4 text-xl'>
        Mit kontrafaktische Erklärungen versucht man die Verhaltensweisen eines Modells verständlich zu machen.{' '}
      </p>
      <p className='mb-4 text-xl'>
        Dabei wird untersucht wie sich die Eingabe des Modells verändern muss, damit das Modell eine andere Entscheidung
        trifft. Dadurch kann man nachvollziehen auf welche Merkmale das Modell besonders acht gibt.
      </p>
      <p className='mb-4 text-xl'>
        In dieser Anwendung erklären wir das Verhalten eines KI-Modells das darauf trainiert wurde zu entscheiden, ob
        eine Person lächelt oder nicht lächelt. Dafür wollen wir herausfinden welche Bereiche im Gesicht der Personen
        sich verändern müssen, damit das Modell seine Entscheidung ändert. Dafür Vergleichen wir die kontrafaktische
        Erklärung einer XAI-Methode und Ihrer eigenen Vorstellung des Konzepts “Lächeln”.
      </p>
    </div>
  )
}

export default WelcomePage
