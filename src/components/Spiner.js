import * as React from 'react';
import { Spin } from 'antd';

const Spiner = () => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      height: '100vh',
      width: '100vw',
      zIndex: 9999,
    }}>
      <Spin  size="large"/>
    </div>
  );
}
export default Spiner;