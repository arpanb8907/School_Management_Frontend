import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeeManagement.css";

const FeeManagement = () => {
  const [feeDetails, setFeeDetails] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [totalFee, setTotalFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Offline");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeeDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://school-management-backend-2k5j.onrender.com/api/fees/studentFee", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeeDetails(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch fee details.");
      }



      // try {
      //   const token = localStorage.getItem("token");
      //   const response = await axios.get("http://localhost:5000/api/fees/studentFee", {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   });
      //   setFeeDetails(response.data);
      // } catch (err) {
      //   setError(err.response?.data?.error || "Failed to fetch fee details.");
      // }

    };

    fetchFeeDetails();
  }, []);

  const handleMonthToggle = (month) => {
    if (selectedMonths.includes(month)) {
      setSelectedMonths(selectedMonths.filter((m) => m !== month));
    } else {
      setSelectedMonths([...selectedMonths, month]);
    }
  };

  useEffect(() => {
    if (feeDetails) {
      setTotalFee(feeDetails.monthlyFee * selectedMonths.length);
    }
  }, [selectedMonths, feeDetails]);

  const handleOfflinePayment = async () => {
    const offlineDetails = {
      receivedBy: "Self",
      receiptNumber: "098665237",
    };
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://school-management-backend-2k5j.onrender.com/api/payments/offline",
        { selectedMonths, offlineDetails },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // const response = await axios.post(
      //   "http://localhost:5000/api/payments/offline",
      //   { selectedMonths, offlineDetails },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
  
      alert("Offline payment recorded successfully!");
      setSelectedMonths([]);
      setFeeDetails((prev) => ({
        ...prev,
        paymentStatus: prev.paymentStatus.map((month) =>
          selectedMonths.includes(month.month) ? { ...month, paid: true } : month
        ),
      }));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to record offline payment.");
    }
  };
  

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://school-management-backend-2k5j.onrender.com/api/payments/process",
        {
          selectedMonths,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // const response = await axios.post(
      //   "http://localhost:5000/api/payments/process",
      //   {
      //     selectedMonths,
      //     paymentMethod,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      alert(`Payment successful! Receipt ID: ${response.data.receiptId}`);
      setSelectedMonths([]);
      setFeeDetails((prev) => ({
        ...prev,
        paymentStatus: prev.paymentStatus.map((month) =>
          selectedMonths.includes(month.month) ? { ...month, paid: true } : month
        ),
      }));
    } catch (err) {
      alert(err.response?.data?.error || "Payment failed.");
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!feeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fee-management">
      {/* Left Section */}
      <div className="fee-details">
        <h1>Fee Management</h1>
        <h2>Grade: {feeDetails.grade}</h2>
        <h3>Monthly Fee: ₹{feeDetails.monthlyFee}</h3>

        <div className="months-list">
          {feeDetails.paymentStatus.map(({ month, paid }) => (
            <div key={month} className={`month-item ${paid ? "paid" : ""}`}>
              <label>
                <input
                  type="checkbox"
                  disabled={paid}
                  checked={selectedMonths.includes(month)}
                  onChange={() => handleMonthToggle(month)}
                />
                <span>{month}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="payment-section">
        <h3>Select Payment Method:</h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>

        <div className="total-fee">
          <h3>Total Fee: ₹{totalFee}</h3>
        </div>
        <button
          className="pay-now"
          disabled={selectedMonths.length === 0}
          onClick={paymentMethod === "Offline" ? handleOfflinePayment : handlePayment}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default FeeManagement;
