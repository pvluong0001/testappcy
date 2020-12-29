import React from 'react';

export default function Layout(props) {
  return (
    <div className="p-1">
      {props.children}
    </div>
  );
};
