import React, { useEffect, useState } from "react";
import { API } from "../../constants/API";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./Payment.css";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const ProductDisplay = ({ token_main, totalCustomers }) => {
  const [value, setValue] = useState(0);
  const [card, setCard] = useState(false);
  const [select, setSelect] = useState(false);
  const [month, setMonth] = useState("current");
  const [loading, setLoading] = useState(false);

  const wallet = useSelector((state) => state.wallet.Wallet);
  const ispayButton = async () => {
    const data = await axios.get(
      `${API.canteen_server}/api/v1/cashpayment/isPayButton`
    );
    // console.log("ispay", data);
    setLoading(data.data.bool);
  };
  useEffect(() => {
    ispayButton();
  }, []);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const handleChangeRadio = (e) => {
    setSelect("true");

    if (e.target.value === "card") {
      setCard(true);
    } else {
      setCard(false);
    }
  };
  function handleClick(e) {
    e.preventDefault();
    console.log("handleClick");
    async function handleclick() {
      console.log("tested");
      try {
        const data = await axios.get(
          `${API.canteen_server}/api/v1/cashpayment/adminRequest`
        );
        console.log("data Payment", data);
      } catch (err) {
        console.log(err);
        throw err;
      }

      setLoading(true);
    }
    handleclick();
  }

  return (
    <section>
      <div className="admin-container">
        <div className="admin-outer">
          <AdminNavbar />
          <div className="top-components">
            <div className="admin-box">
              <div className="box-left">
                <p className="box-title">USERS</p>
                <p className="box-value">
                  {totalCustomers ? totalCustomers : 0}
                </p>
                <Link
                  to="/admin-dashboard"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <p className="box-desc">See All Users</p>
                </Link>
              </div>
              <div className="box-right">
                <div className="box-right-top green">
                  <KeyboardArrowUpSharpIcon />
                  <p>+5%</p>
                </div>
                <div className="box-right-bottom red">
                  <AccountBoxRoundedIcon />
                </div>
              </div>
            </div>
            <div className="admin-box">
              <div className="box-left">
                <p className="box-title">WALLET</p>
                <p className="box-value">₹{wallet}</p>
                <Link
                  to="/admin-dashboard/transaction"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <p className="box-desc">See Total Balance</p>
                </Link>
              </div>
              <div className="box-right">
                <div className="box-right-top green">
                  <KeyboardArrowUpSharpIcon />
                  <p>+2%</p>
                </div>
                <div className="box-right-bottom green">
                  <Link to="/admin-dashboard/Payment">
                    <button className="gen2">Pay</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="admin-box box-report">
              <div className="box-left">
                <p className="box-title">MONTHLY REPORT</p>
                {/* <p className="box-value">Month</p> */}
                <select
                  value={month}
                  onChange={(e) => {
                    setMonth(e.target.value);
                    console.log(e.target.value);
                  }}
                  id="month"
                  style={{ padding: "5px" }}
                >
                  <option value="current">Current</option>
                  <option value="prev">Previous</option>
                </select>
                <a
                  href={
                    // month === "prev"
                    month === "current"
                      ? "http://127.0.0.1:5000/api/v1/admin/thismonthreport"
                      : "http://127.0.0.1:5000/api/v1/admin/lastmonthreport"

                    // : "http://127.0.0.1:5000/api/v1/admin/thismonthreport"
                  }
                  className="rep-btn"
                >
                  Generate
                </a>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="loading">
              <h2>Payment Processing</h2>
              <img
                src="https://www.freeiconspng.com/uploads/load-icon-png-8.png"
                width="350"
                alt=""
              />
            </div>
          ) : (
            <div className="bor">
              <h2 className="pay_header">Payment Options</h2>
              <div className="pay_info">
                <div className="pay_opt">
                  <input
                    type="radio"
                    onChange={handleChangeRadio}
                    name="pay"
                    value="card"
                    id="card"
                  />{" "}
                  <span>
                    PAYMENT WITH CARD{" "}
                    <img
                      src="https://w7.pngwing.com/pngs/32/363/png-transparent-visa-master-card-and-american-express-mastercard-payment-visa-credit-card-emv-credit-card-visa-and-master-card-background-text-display-advertising-logo-thumbnail.png"
                      alt=""
                      className="pay_img"
                    />
                  </span>
                </div>
                <div className="pay_opt">
                  <input
                    type="radio"
                    onChange={handleChangeRadio}
                    name="pay"
                    value="check"
                    id="check"
                  />
                  <span>PAYMENT WITH CHECK</span>
                </div>
              </div>
              {select &&
                (card ? (
                  <form action="/create-checkout-session" method="POST">
                    <button type="submit">Checkout</button>
                  </form>
                ) : (
                  <form>
                    <button type="submit" onClick={(e) => handleClick(e)}>
                      Check
                    </button>
                  </form>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Payment() {
  let navigate = useNavigate();
  const handle_success = async () => {
    console.log("Payment started");
    await axios.get(`${API.admin_server}/api/v1/admin/fullfillpayment`, {
      headers: {},
    });
    console.log("Payment finished");
  };
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    const url = window.location.href;
    if (url == "http://127.0.0.1:3000/?success=true") {
      console.log("done payment");
      navigate("admin-dashboard/success");
      setMessage("Order placed! You will receive an email confirmation.");
    }
    if (query.get("success")) {
      handle_success();
      navigate("admin-dashboard/success");
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
