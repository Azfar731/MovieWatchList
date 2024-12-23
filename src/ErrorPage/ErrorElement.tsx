import "./ErrorElement.css";
import {
  useRouteError,
  Link,
  isRouteErrorResponse,
} from "react-router-dom";

type ErrorType =  {msg: "string"; status: number | string; manual:boolean}

export default function ErrorElement({ width= "100%", height= "100%", backgroundColor="white", links=[{path:"/",text:"Go to Homepage"}]}) {
 
  const error: ErrorType | string = useRouteError() as ErrorType;
  console.log("Error:", error);

  if (isRouteErrorResponse(error)) {
    console.log("isRouteErrorResponse is true");
  }

  let msg,status

  if(error.manual){
   ( {msg,status} = error)

  }else{
    msg = "Internal Server Error"
    status = 500
  }

  
  const buttonArray = links.map((link)=>{
    return <Link to={link.path} className="error-btn">{link.text}</Link>
  });

  console.log(buttonArray)


  return (
    <div style={{width, height, backgroundColor}}>
      <div className="error-container">
        <div className="xl-font">Oops!</div>

        <h2 className="error-heading">{status} - {msg}</h2>
        
        <p className="error-body">You can try reloading the page or go back to HomePage</p>

        {buttonArray}
      </div>
    </div>
  );
}
