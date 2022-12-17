import React from 'react';
import { Link } from 'react-router-dom';

function BadRequest() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
    <Link to="/">
      {' '}
      <div
        style={{
          position: 'absolute',
          width: '100px',
          height: '50px',
          border: '1px solid',

          borderRadius: '6px',
          background: 'white',
        }}
        className="flex items-center justify-center"
      >
        <span style={{ color: '#00ADE8' }}> Home Page</span>
      </div>
    </Link>
      <img
        style={{ width: '100%', height: '100%' }}
        src="https://img.freepik.com/free-vector/400-error-bad-request-concept-illustration_114360-1902.jpg?w=2000"
        alt="bad-request"
      />
    </div>
  );
}

export default BadRequest;
