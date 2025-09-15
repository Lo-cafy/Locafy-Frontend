// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/Pages/LandingPage";
import UserLayout from "./Pages/User/User";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Home />} />

          {/* Dashboard layout */}
          <Route path="/user/*" element={<UserLayout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
