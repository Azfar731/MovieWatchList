import "./Placeholder.css";

import { ReactNode } from 'react';

export default function PlaceHolder({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="placeholder-container">
        {children}
      </div>
    </>
  );
}
