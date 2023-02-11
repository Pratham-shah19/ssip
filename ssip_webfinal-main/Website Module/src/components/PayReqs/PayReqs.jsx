import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { API } from "../../constants/API";
import axios from "axios";
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

const PayReqs = ({ oldreqs, currentreqs }) => {
  console.log("PayReqs", oldreqs, currentreqs);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const boxed = () => {
    return currentreqs.map((item) => {
      return (
        <div>
          <p>price : {item.price}</p>
          <p>Time : {item.updatedAt}</p>
          <button
            onClick={() => {
              console.log("clicked");
            }}
          >
            Kharu
          </button>
        </div>
      );
    });
  };
  const Boxed = (item) => {
    // console.log("boxed", item);

    return (
      <div className="boxed">
        <p>price : {item.item.price}</p>
        <p>Time : {item.item.updatedAt}</p>
        {item.item.isLoading && (
          <button
            onClick={async () => {
              const data = await axios.get(
                `${API.canteen_server}/api/v1/cashpayment/canteenAccept/${item.item._id}`
              );
              console.log(data);
            }}
          >
            Kharu
          </button>
        )}
      </div>
    );
  };
  return (
    <Box sx={{ width: "100%", overflowY: "scroll" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Current Requests" {...a11yProps(0)} />
          <Tab label="Past Payments" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        {/* <Boxes data={currentreqs} /> */}
        {currentreqs.map((item) => {
          return <Boxed item={item} />;
        })}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {oldreqs.map((item) => {
          //   return (
          //     <div>
          //       <p>price : {item.price}</p>
          //       <p>price : {item.updatedAt}</p>
          //     </div>
          //   );
          return <Boxed item={item} />;
        })}
      </TabPanel>
    </Box>
  );
};

export default PayReqs;
