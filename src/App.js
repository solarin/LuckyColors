import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import History from "./Components/History";
import Home from "./Components/Home";
import { Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
function App() {
  return (
    <div className="w-100">
      <Switch>
        <Route exact path="/LuckyColors/" component={Home} />
        <Route path="/LuckyColors/history" component={History} />
      </Switch>
    </div>
  );
}

export default App;
