import React from 'react';
import { Link } from 'react-router-dom';

function ServerError() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <img
        style={{ width: '100%', height: '100%' }}
        src="https://giacongreal.com/wp-content/uploads/2022/06/500-Internal-Server-Error.jpg"
        alt="erorr"
      />
    </div>
  );
}

export default ServerError;
