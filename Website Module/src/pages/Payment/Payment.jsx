import React from "react";
import { API } from "../../constants/API";
import axios from "axios";

const Payment = () => {
  let [date, setDate] = React.useState("07/02/2023");
  let [amt, setAmt] = React.useState(5000);

  async function handle_Payment() {
    const data = await axios.post(
      `${API.payment_server}/api/v1/payment/create-checkout-session`,
      {
        amount: amt,
        date: date,
      }
    );
  }

  return (
    <div className="Payment">
      <button type="button"></button>
    </div>
  );
};
export default Payment;
