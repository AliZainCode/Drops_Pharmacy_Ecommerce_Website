import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  const session_id = params.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!session_id) {
        setStatus("cod");
        return;
      }

      try {
        const res = await fetch(
          "http://127.0.0.1:8002/api/payment/verify-payment/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id }),
          },
        );

        const data = await res.json();

        if (data.success) {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (error) {
        setStatus("failed");
      }
    };

    verifyPayment();
  }, [session_id]);

  if (status === "loading") {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Verifying Order...
      </h2>
    );
  }

  if (status === "failed") {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2> Payment verification failed</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>

      {status === "cod" && (
        <p>Cash on Delivery order successfully submitted.</p>
      )}

      {status === "success" && (
        <p>Your payment has been verified successfully.</p>
      )}

      <button
        onClick={() => navigate("/")}
        style={{
          padding: "12px 25px",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "8px",
          marginTop: "20px",
          backgroundColor: "#10B981",
        }}
      >
        Go to Home Page
      </button>
    </div>
  );
}

export default PaymentSuccess;
