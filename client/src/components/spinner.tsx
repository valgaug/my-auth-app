import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

const Spinner: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <BeatLoader />
    </div>
  );
};

export default Spinner;
