import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import Index from "./components/Index";
import Receipts from "./components/Receipts";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />

  },
  {
    path: "/create-invoice",
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


