import "./Button.css";
import { PageButtonContext } from "../../pages/HomePage";
import { useContext } from "react";

type Params = {
  value: number;
  text: string;
} & Record<string, unknown>;

export default function Button({ value, text, ...rest }: Params) {
  const loadPage = useContext(PageButtonContext) as (value: number) => void;

  return (
    <button {...rest} onClick={() => loadPage(value)}>
      {text}
    </button>
  );
}
