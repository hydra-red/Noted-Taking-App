import {Routes,Route} from "react-router"
import CreateNote from "./Pages/CreateNote.jsx";
import Home from "./Pages/Home.jsx";
import ViewNote from "./Pages/ViewNote.jsx";
import toast from "react-hot-toast";

function App() {
  return (
    <div>
    <button onClick={()=> (toast.success("congrats"))} className="btn">Click Me</button>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/create" element={<CreateNote />}/>
        <Route path="/note/:id" element={<ViewNote />}/>
      </Routes>
    </div>
  );
}

export default App;
