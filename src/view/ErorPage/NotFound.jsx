import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
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
        src="https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png"
        alt="eror"
      />
    </div>
  );
}

export default NotFound;
