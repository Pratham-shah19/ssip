import Reac, { useEffect, useState } from "react";
import { API } from "../../constants/API";
import axios from "axios";

// const Payment = () => {
//   let [date, setDate] = React.useState("07/02/2023");
//   let [amt, setAmt] = React.useState();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let res = await fetch(
//         `${API.payment_server}/api/v1/payment/create-checkout-session`,
//         {
//           method: "POST",
//           // {Headers: { 'Content-Type': 'application/json',}},
//           body: JSON.stringify({
//             date: date,
//             amount: amt,
//           }),
//         }
//       );
//       let resJson = await res.json();
//       if (res.status === 200) {
//         setAmt("");
//         setDate("");
//       } else {
//         console.log("Err: some error");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // const handle_Payment = async () => {
//   //   await axios.post(
//   //     `${API.payment_server}/api/v1/payment/create-checkout-session`,
//   //     {
//   //       amount: amt,
//   //       date: date,
//   //     },
//   //     {
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //     }
//   //   );

//   //   const response = await fetch()
//   //   fetch("http://example.com/movies.json")
//   //     .then((response) => response.json())
//   //     .then((data) => console.log(data));
//   //   try {
//   //     console.log(data);
//   //   } catch (err) {
//   //     console.error(err);
//   //     throw err;
//   //   }
//   // };

//   // let url = `${API.payment_server}/api/v1/payment/create-checkout-session`;
//   // let data = {
//   //   amount: amt,
//   //   date: date,
//   // };
//   // const response = {};
//   // try {
//   //   response = await fetch(url, {
//   //     method: "POST", // *GET, POST, PUT, DELETE, etc.
//   //     // mode: "cors", // no-cors, *cors, same-origin
//   //     // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//   //     // credentials: "same-origin", // include, *same-origin, omit
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //       // 'Content-Type': 'application/x-www-form-urlencoded',
//   //     },
//   //     // redirect: "follow", // manual, *follow, error
//   //     // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//   //     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   //   });
//   // } catch (e) {
//   //   console.error(e);
//   //   throw e;
//   // }
//   // console.log(response);
//   // return response.json(); // parses JSON response into native JavaScript objects
//   // };

//   return (
//     <div className="form">
//       <form>
//         <input
//           value={date}
//           onChange={(e) => {
//             console.log(e.target.value);
//             setDate(e.target.value);
//           }}
//           label="date"
//           type="text"
//         />
//         <input
//           value={amt}
//           onChange={(e) => {
//             console.log(e.target.value);
//             setAmt(e.target.value);
//           }}
//           label="amt"
//           type="Number"
//         />
//         <input type="submit" value="SUBMIT" onClick={handleSubmit} />
//       </form>
//     </div>
//   );
// };
// export default Payment;

const ProductDisplay = () => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <button type="submit">Checkout</button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Payment() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
}
