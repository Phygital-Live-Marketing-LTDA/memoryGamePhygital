import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import InitialPage from './pages/InitialPage';
import MemoryGame from "./components/Game/MemoryGame";


const router = createBrowserRouter([
  {
    path: "/",
    element: <InitialPage />,
  },
  {
    path: "/game",
    element: <MemoryGame />,
  },
]);

function App() {
  return (
    <div>
    {<RouterProvider router={router}></RouterProvider> }
    </div>
  )
}

export default App