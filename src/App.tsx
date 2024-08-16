import "./App.css";
import HomePage, { loader as HomePageLoader } from "./pages/HomePage";
import WatchList from "./pages/WatchList";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
function App() {
  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/">
          <Route
            index
            element={<HomePage />}
            loader={HomePageLoader}
          />
          <Route path="/watchlist" element={<WatchList />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={browserRouter} />;
}

export default App;
