import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import Receipts from "./components/Receipts";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Receipts />
  },

]);

function App() {

  return (
    <>
      <div className="bg-slate-100 border-2">
        <RouterProvider router= {router} />
      </div>  
    </>
  )
}

export default App


