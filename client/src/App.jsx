import {Routes,Route} from "react-router"
import CreateNote from "./Pages/CreateNote.jsx";
import Home from "./Pages/Home.jsx";
import ViewNote from "./Pages/ViewNote.jsx";
import toast from "react-hot-toast";

function App() {
  return (
    <div className="relative h-full w-full">
    <div className="absolute insert-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#212529_60%,#949494_100%)]"/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/create" element={<CreateNote />}/>
        <Route path="/note/:id" element={<ViewNote />}/>
      </Routes>
    </div>
  );
}

export default App;
