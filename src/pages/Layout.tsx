import React from 'react';
import Loader from 'react-loader-spinner';

export default function Layout(props) {
  return (
    <div>
        {
          props.loading &&
          <div className="bg-opacity-50 bg-gray-400 flex" style={{width: '100%', height: '100%', position: 'fixed', background: ''}}>
            <Loader
              className="m-auto"
              type="Oval"
              color="#00BFFF"
              height={100}
              width={100}
              visible={true}
            />
          </div>
        }

      {props.children}
    </div>
  );
};
