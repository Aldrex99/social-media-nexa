import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Todo } from "./pages/Todo";

function App() {
  return (
    <div className="min-h-[100vh] overflow-y-auto overflow-x-hidden bg-gray-50">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todo-list" element={<Todo />} />
          <Route
            path="*"
            element={
              <div>
                <h1>404</h1>
                <Link to="/" className="text-blue-800 underline">
                  Go to Home
                </Link>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
