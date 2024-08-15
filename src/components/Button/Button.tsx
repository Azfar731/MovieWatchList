import "./Button.css";
import { PageButtonContext } from "../../pages/HomePage";
import { useContext } from "react";

export default function Button({ value }: { value: number }) {
    const managePageNumber = useContext(PageButtonContext)

    return (
    <button className="page-btn" onClick={() => managePageNumber(value)}>{value}</button>
  )
}
