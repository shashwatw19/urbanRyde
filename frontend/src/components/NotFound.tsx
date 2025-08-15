import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: '#f8f8f8',
            padding : '10px'
        }}>
            
            <h1 style={{ fontSize: '2.5rem', color: '#333' }}>404 - Page Not Found</h1>
            <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '1rem', textAlign: 'center' }}>
                The page you are trying to access has not been created yet.<br />
                Please check back later or return to the homepage.
            </p>
            <button
                className='bg-black text-white font-semibold p-4 rounded-full mt-10'
                onClick={() => navigate('/')}
            >
                Go to Home Page
            </button>
        </div>
    );
};

export default NotFound;