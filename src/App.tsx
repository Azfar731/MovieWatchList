import "./App.css";
import HomePage, {loader as HomePageLoader} from "./pages/HomePage";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"; 
function App() {
  
  const browserRouter = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<HomePage />} loader={HomePageLoader}/>
  ))


  return (
    <RouterProvider router={browserRouter}/>
  );
}

export default App;
