import React from 'react'
import { AiOutlineLoading3Quarters, AiOutlineCheck } from 'react-icons/ai'

interface LoadingModalProps {
  loadingText: string
  isLoading: boolean
  success: boolean
  onPrimaryAction: () => void
  primaryButtonText: string
}

const LoadingModal: React.FC<LoadingModalProps> = ({ loadingText, isLoading, success, onPrimaryAction, primaryButtonText }) => {
  return (
    <div className="fixed z-50 inset-0 bg-gray-600 backdrop-blur-sm bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-1/3 shadow-lg rounded-md bg-white">
        <div className="text-center my-4">
          <h3 className="text-2xl font-bold text-gray-900 my-4">
            {isLoading ? loadingText : success ? 'Success!' : 'Failed'}
          </h3>
          <div className="mt-2 px-3 py-3 flex justify-center">
            {isLoading
              ? (
              <AiOutlineLoading3Quarters className="animate-spin h-24 w-24 text-blue-500" />
                )
              : success
                ? (
              <AiOutlineCheck className="h-24 w-24 text-green-500" />
                  )
                : (
                    'An error occurred.'
                  )}
          </div>
          <button onClick={onPrimaryAction} className={'bg-cyan-700 text-white px-8 py-2 m-4'}>{primaryButtonText}</button>
        </div>
      </div>
    </div>
  )
}

export default LoadingModal
