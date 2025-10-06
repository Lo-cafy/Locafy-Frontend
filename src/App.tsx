// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/Pages/LandingPage";
import UserLayout from "./Pages/User/User";
import AllServicesPage from "./Pages/Services/allServices";
import ServiceDetailPage from "./Pages/Services/Servicedetail";
import BookingPage from "./Pages/Services/Booking";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Home />} />
          {/* Dashboard layout */}
          <Route path="/user/*" element={<UserLayout />} />
          <Route path="/all-services" element={<AllServicesPage/>} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/services/:id/booking" element={<BookingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
