import React from "react";
import { API } from "../../constants/API";
import axios from "axios";

const Payment = () => {
  let [date, setDate] = React.useState("07/02/2023");
  let [amt, setAmt] = React.useState(5000);

  const handle_Payment = async () => {
    await axios.post(
      `${API.payment_server}/api/v1/payment/create-checkout-session`,
      {
        amount: amt,
        date: date,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    //   const response = await fetch()
    //   fetch("http://example.com/movies.json")
    //     .then((response) => response.json())
    //     .then((data) => console.log(data));
    //   try {
    //     console.log(data);
    //   } catch (err) {
    //     console.error(err);
    //     throw err;
    //   }
    // };

    // let url = `${API.payment_server}/api/v1/payment/create-checkout-session`;
    // let data = {
    //   amount: amt,
    //   date: date,
    // };
    // const response = {};
    // try {
    //   response = await fetch(url, {
    //     method: "POST", // *GET, POST, PUT, DELETE, etc.
    //     // mode: "cors", // no-cors, *cors, same-origin
    //     // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //     // credentials: "same-origin", // include, *same-origin, omit
    //     headers: {
    //       "Content-Type": "application/json",
    //       // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     // redirect: "follow", // manual, *follow, error
    //     // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //     body: JSON.stringify(data), // body data type must match "Content-Type" header
    //   });
    // } catch (e) {
    //   console.error(e);
    //   throw e;
    // }
    // console.log(response);
    // return response.json(); // parses JSON response into native JavaScript objects
  };

  return (
    <div className="Payment">
      <button type="button" onClick={handle_Payment}>
        Click For Payment
      </button>
    </div>
  );
};
export default Payment;
