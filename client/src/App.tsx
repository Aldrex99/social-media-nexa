import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "@/contexts/UserProvider";
import { PrivateRoute } from "@utils/PrivateRoute";
import UserRouteWrapper from "@utils/UserRouteWrapper";

import Login from "@pages/Login";
import Register from "@pages/Register";
import Me from "@pages/Me";
import Todo from "@pages/Todo";
import Post from "@pages/Post";
import NotFound from "@pages/NotFound";
import Logout from "@pages/Logout";

function App() {
  return (
    <UserProvider>
      <div className="min-h-[100vh] overflow-y-auto overflow-x-hidden bg-gray-100">
        <Router>
          <Routes>
            <Route>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<PrivateRoute acceptedRole={["user"]} />}>
              <Route
                path="/me"
                element={<UserRouteWrapper children={<Me />} />}
              />
              <Route
                path="/post"
                element={<UserRouteWrapper children={<Post />} />}
              />
              <Route
                path="/todo-list"
                element={<UserRouteWrapper children={<Todo />} />}
              />
              <Route path="/logout" element={<Logout />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
