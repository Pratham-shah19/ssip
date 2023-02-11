import MenuCardList from "../MenuCardsList/MenuCardList";
import { connect } from "react-redux";

import * as itemsAction from "../../store/actions/items";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
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

const Menu = ({ setDummyHot, Starters, MainCourse, IceCreams, token }) => {
  const [value, setValue] = React.useState(0);
  console.log("Log");
  let navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  React.useEffect(() => {
    setDummyHot();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Dessert" {...a11yProps(0)} />
          <Tab label="MainCourse" {...a11yProps(1)} />
          <Tab label="Snacks" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <MenuCardList data={IceCreams} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <MenuCardList data={MainCourse} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <MenuCardList data={Starters} />
      </TabPanel>
    </Box>
  );
};
function mapStateToProps(state) {
  return {
    token: state.auth.token,
    IceCreams: state.items.IceCream,
    MainCourse: state.items.MainCourse,
    Starters: state.items.Starter,
  };
}
function mapStateToDispatch(dispatch) {
  return {
    setDummyHot: () => {
      dispatch(itemsAction.setDummyHot());
    },
  };
}
export default connect(mapStateToProps, mapStateToDispatch)(Menu);
