export default function Mobile() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Apologies</h1>
                <p className="text-gray-700">
                    We apologize for the inconvenience, but it is not possible to participate in this user study on a mobile device.
                </p>
                <p className="text-gray-700 mt-2">
                    Please try accessing the study on a desktop or laptop computer.
                </p>
            </div>
        </div>
    )
}