import React from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate

const Error401 = () => {
    const navigate = useNavigate() // Initialize navigate

    // Handle click to navigate back
    const handleClick = () => {
        navigate(-1) // Navigate to the previous page
    }

    return (
        <div
            id="app"
            className="w-screen h-screen relative overflow-hidden bg-gradient-to-br from-purple-800 to-orange-600 flex items-center justify-center flex-col"
            onClick={handleClick} // Navigate back on click
        >
            <div className="text-white text-6xl font-bold py-4 flex flex-col items-center">
                <div className="flex gap-4">
                    <span>4</span>
                    <span>0</span>
                    <span>1</span>
                </div>
                <div className="text-4xl mt-4">ERROR</div>
                <div className="text-xl mt-2 text-center px-8">
                    UNAUTHORIZED
                    <br />
                    You do not have permission to access this page.
                    <br />
                    Click anywhere on the screen to go back to the previous
                    page.
                </div>
            </div>
        </div>
    )
}

export default Error401
