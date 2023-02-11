import React, { useEffect } from "react";
import "./OwnerAnalytics.css";

// import React, { useEffect } from "react";
import HistoryIcon from "@mui/icons-material/History";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Sidebar from "../../components/Sidebar/Sidebar";
// import DetailBar_Owner_Graph from "../../components/DetailBar_Owner_/DetailBar_Owner";
import DetailBar_Owner_G from "../../components/DetailBar_Owner/DetailBar_Owner";
// import DetailBar_Owner from "../../components/DetailBar_Owner_Graph/DetailBar_Owner_Graph";
import DetailBar_Owner_Graph from "../../components/DetailBar_Owner_Graph/DetailBar_Owner_Graph";
// import Home from "../../components/Home/Home";
// import Header from "../../components/Header_Home/Header";
// import Wallet from "../../components/Wallet/Wallet";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import CurrencyRupeeSharpIcon from "@mui/icons-material/CurrencyRupeeSharp";
// import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
// import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../../constants/API";
import Chart from "../../components/Chart/Chart";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import RevenueBox from "../RevenueBox/RevenueBox";
// import PayReqs from "../PayReqs/PayReqs";
import Header from "../../components/Header_Home/Header";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useState } from "react";
import { useSelector } from "react-redux";
const OwnerAnalytics = () => {
  const [chart, setChart] = React.useState(true);
  const [value, setValue] = React.useState(0);
  let [_data, setData] = React.useState([]);

  const data = [
    {
      name: "Samosa",
      qty: 40,
    },
    {
      name: "Gujrati Thali",
      qty: 30,
    },
    {
      name: "Coffee",
      qty: 20,
    },
    {
      name: "Tea",
      qty: 27,
    },
    {
      name: "Idli Sambhar",
      qty: 18,
    },
    {
      name: "Upma",
      qty: 23,
    },
    {
      name: "Poha",
      qty: 34,
    },
  ];
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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handle_data = async () => {
    const data = await axios.get(`${API.django_server}`);
    console.log("called", data.data);
    setData(data.data.Graph);
  };

  React.useEffect(() => {
    // console.log("Hello");
    handle_data();
    console.log("Chart");
  }, []);
  let navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const btn2_handle = () => {
    navigate("/owner-dashboard/profileScreen");
  };
  const Item_chart = (data) => {
    const [search, setSearch] = useState("");
    const [searchres, setSearchres] = useState([]);
    const [graphData, setGraphData] = useState();
    const [graph, setGraph] = useState(false);
    async function handleChange(e) {
      console.log("e.target.value", e.target.value);
      setSearch(e.target.value);
      const data = await axios.get(
        `${API.canteen_server}/api/v1/canteen/searchGraph?search=${e.target.value}`
      );
      console.log("data", data);
      setGraph(true);
      setSearchres(data.data.data);
    }
    let id = useSelector((state) => state.items.id);
    async function handleChart(e) {
      const data = await axios.get(
        `${API.canteen_server}/api/v1/canteen/displayDish/${id}`,
        { headers: {} }
      );
      console.log("DetailBar res", data.data.data);
      setGraphData(data.data.data);
    }
    useEffect(() => {
      handleChart();
    }, [id]);
    //slot1 : slot1
    //value: arr[0]
    return (
      <div>
        <div className="admin-search">
          <div className="admin-search-inner-ow">
            <input
              className="inp-qt"
              type="text"
              name="search"
              onChange={handleChange}
              id="search"
              value={search}
              placeholder="Search any customer"
            />
            <PersonSearchIcon
              style={{ transform: "scale(1.5)", cursor: "pointer" }}
            />
          </div>
          <div className="admin-search-results">
            {searchres.length <= 0 ? (
              <h1>Search Employee</h1>
            ) : (
              <div>
                {/* <div className="one-result3">
                <p className="result-id">S_ID</p>
                <p className="result-name">USERNAME</p>
                <p className="avail">AVAILABLE</p>
                <p className="avail">NEW</p>
              </div> */}
                {searchres.map((item) => {
                  return <DetailBar_Owner_Graph data={item} />;
                })}
              </div>
            )}
          </div>
          {graph && (
            <div className="bottom-right">
              <Chart data={graphData} />
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="owner-dashboard-container">
      <div className="owner-inner-container">
        <div className="owner-left">
          <Sidebar />
        </div>
        <div className="owner-right">
          <div
            className="header_handle"
            style={{ borderBottom: "1px solid black" }}
          >
            <Header
              title="Owner Analytics"
              btn2={btn2_handle}
              btn2title={<AccountCircleIcon sx={{ fontSize: 40 }} />}
            />
          </div>
          <hr />
          {/* <Chart /> */}
          <div>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Graph1" {...a11yProps(0)} />
                  <Tab label="Graph2" {...a11yProps(1)} />
                  <Tab label="Graph3" {...a11yProps(2)} />
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <div className="bottom-right">
                  <Chart data={data} />
                </div>
              </TabPanel>

              <TabPanel value={value} index={1}>
                <Item_chart />
              </TabPanel>

              <TabPanel value={value} index={2}>
                <div className="bottom-right">
                  <Chart data={data} />
                </div>
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerAnalytics;
