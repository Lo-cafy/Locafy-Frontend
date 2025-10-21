import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import  baseURL  from "@/Api/baseurl";

export interface BookingData {
  selectedDate: string;
  selectedTimeSlot: string;
  selectedAddress: string;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
  };
  specialInstructions: string;
  selectedAddons: string[];
  paymentMethod: string;
  promoCode: string;
}

export function useBookingData() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const serviceData = location.state?.service;

  const [service, setService] = useState<any>(serviceData);
  const [loading, setLoading] = useState(!serviceData);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Main booking state
  const [bookingData, setBookingData] = useState<BookingData>({
    selectedDate: "",
    selectedTimeSlot: "",
    selectedAddress: "home",
    customerInfo: {
      name: "John Doe",
      phone: "+1 234 567 8900",
      email: "john@example.com"
    },
    specialInstructions: "",
    selectedAddons: [],
    paymentMethod: "upi",
    promoCode: ""
  });

  // Update individual booking data fields
  const updateBookingData = (field: keyof BookingData, value: any) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Update nested customer info
  const updateCustomerInfo = (field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        [field]: value
      }
    }));
  };

  useEffect(() => {
    if (!serviceData && id) {
      const fetchService = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`${baseURL}/api/services/${id}`);
          const data = res.data.service || res.data.data || res.data;
          setService(data);
        } catch (err) {
          console.error("Error fetching service:", err);
          navigate("/all-services");
        } finally {
          setLoading(false);
        }
      };
      fetchService();
    }
  }, [id, serviceData, navigate]);

  useEffect(() => {
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    updateBookingData("selectedDate", tomorrow.toISOString().split('T')[0]);
  }, []);

  const handleBooking = async () => {
    setIsBooking(true);
    // Simulate booking API call with all booking data
    console.log("Booking data:", bookingData);
    setTimeout(() => {
      setBookingSuccess(true);
      setIsBooking(false);
    }, 2000);
  };

  return {
    service,
    loading,
    isBooking,
    bookingSuccess,
    bookingData,
    updateBookingData,
    updateCustomerInfo,
    handleBooking
  };
}


