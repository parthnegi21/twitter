
import React from 'react';

const Loader = () => (
    <div className="loader-container">
        <div className="loader"></div>
        <style jsx>{`
            .loader-container {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: black;
            }
            .loader {
                border: 4px solid gray;
                border-top: 4px solid #1971ff;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                animation: spin 0.7s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}</style>
    </div>
);

export default Loader;
