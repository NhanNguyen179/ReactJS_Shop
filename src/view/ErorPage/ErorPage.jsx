import React from 'react';
import { Link } from 'react-router-dom';

function ErorPage() {
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
      <img style={{ width: '100%', height: '100%' }} src="https://cdn.dribbble.com/users/156243/screenshots/3626759/media/897f7fff0ea1d6937574f9aafa41c616.png?compress=1&resize=400x300&vertical=top" alt="eror" />
    </div>
  );
}

export default ErorPage;
