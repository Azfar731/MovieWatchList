import "./Placeholder.css";

export default function PlaceHolder({ children }) {
  return (<>
    <div className="placeholder-container">
      {children}
    </div>
  </>);
}
