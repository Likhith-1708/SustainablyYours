import React, { useState } from "react";
import { Button } from '../components/ui/Button';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const navigate = useNavigate();

  const BACKEND_URL = "http://localhost:5000";

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setShowOtpField(true);
        alert("OTP sent to your email!");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (res.ok) {
        alert("OTP Verified!");
        navigate("/organization");
        setShowOtpField(false);
        setEmail("");
        setOtp("");
      } else {
        const data = await res.json();
        alert(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Error verifying OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Left image */}
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <img
            src="https://deepwoodsgreen.com/wp-content/uploads/2025/08/8d369dab-0e91-4323-bf12-2414d0a23441-scaled.jpg"
            alt="Login Illustration"
            className="max-w-md"
          />
        </div>

        {/* Right form */}
        <div className="flex flex-col bg-blue-100 justify-center w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6">Login</h2>

          {/* Email input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          {/* Send OTP button */}
          <Button
            onClick={handleSendOtp}
            className="w-full"
            disabled={loading || !email}
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>

          {/* OTP form — shows only after Send OTP clicked */}
          {showOtpField && (
            <form
              onSubmit={handleVerifyOtp}
              className="space-y-4 mt-4"
            >
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <Button
                type="submit"
                className="w-full"
                disabled={loading || otp.length === 0}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
