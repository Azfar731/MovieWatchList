import "./App.css";
import HomePage from "./pages/Homepage2";
import WatchList from "./pages/WatchList";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ErrorElement from "./ErrorPage/ErrorElement";
import PlaceHolder from "./components/Placeholder";
import { PiFilmReelFill } from "react-icons/pi";
function App() {
  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={<HomePage />}
          errorElement={
            <ErrorElement
              width="100%"
              height="90vh"
              backgroundColor="whitesmoke"
            />
          }
        >
          <Route
            index
            element={
              <PlaceHolder>
                {" "}
                <div className="flex-column-container">
                  <PiFilmReelFill className="icon" />
                  <h1>Start Exploring</h1>
                </div>
              </PlaceHolder>
            }
          />
          <Route path="search">
            <Route path=":searchTitle" element={<SearchResults />} />
            <Route path=":searchTitle/:id" element={<MovieDetails />} />
          </Route>
        </Route>
        <Route
          path="/watch-list"
          element={<WatchList />}
          errorElement={
            <ErrorElement
              width="100%"
              height="90vh"
              backgroundColor="whitesmoke"
            />
          }
        />
      </>
    )
  );

  return <RouterProvider router={browserRouter} />;
}

export default App;
