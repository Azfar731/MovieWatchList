import "./App.css";
import HomePage from "./pages/HomePage";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"; 
function App() {
  
  const browserRouter = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<HomePage />}/>
  ))


  return (
    <RouterProvider router={browserRouter}/>
  );
}

export default App;
