import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import Home from "@/pages/LandingPage";
import { Services } from "./features/serviceTemp/pages/Services";
import { ServiceDetails } from "./features/serviceTemp/pages/ServiceDetails";
import { AuthDialog } from "./features/Auth/pages/Auth";
import DashboardLayout from "./Components/Layout/DashboardLayout";
import './index.css';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Routes>
           
            <Route path="/" element={<Home />} />
            
      
            <Route path="/auth" element={<AuthDialog />} />
            
 
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetails />} />

        
            <Route path="/user/*" element={<DashboardLayout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;