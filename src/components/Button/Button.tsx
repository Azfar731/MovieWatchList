import "./Button.css";
import { PageButtonContext } from "../../pages/HomePage";
import { useContext } from "react";

export default function Button({ value, text, ...rest }: { value: number, text: string, [key: string]: any }) {
    const managePageNumber = useContext(PageButtonContext)

    return (
    <button {...rest}  onClick={() => managePageNumber(value)}>{text}</button>
  )
}
