import React, { useEffect, useState, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import * as CustomersActions from "../.././store/actions/Customers";
import { useSelector, useDispatch } from "react-redux";
import Payment_Mode from "../Payment_Mode/Payment_Mode";
import "./Payment_Inputs.css";
const Payment_inputs = () => {
  let [myOptions_Nums, setMyOptions_Nums] = useState([]);
  let [myOptions_email, setMyOptions_email] = useState([]);
  let [myOptions_name, setMyOptions_name] = useState([]);
  const [Customers, setcustomer] = useState([]);
  let [firstname, setFirstName] = useState("");
  let [lastname, setLastName] = useState();

  const dispatch = useDispatch();
  const cust = useSelector((state) => state.customer.CUSTOMERS);
  let test_set_nums = new Set();
  let test_set_email = new Set();
  let test_set_name = new Set();
  const getCustomers = () => {
    dispatch(CustomersActions.setCustomers());
    setcustomer(cust);
    for (var i = 0; i < Customers.length; i++) {
      test_set_nums.add(Customers[i].mobile_number.toString());
      myOptions_Nums = Array.from(test_set_nums);
    }
    for (var i = 0; i < Customers.length; i++) {
      // console.log('email_id',Customers[i].email_id)
      test_set_email.add(Customers[i].email_id.toString());
      myOptions_email = Array.from(test_set_email);
    }
    for (var i = 0; i < Customers.length; i++) {
      // console.log('cust_name',Customers[i].cust_name)
      test_set_name.add(Customers[i].cust_name.toString());
      myOptions_name.push(Customers[i].cust_name.toString());
    }
    setMyOptions_Nums(myOptions_Nums);
    setMyOptions_email(myOptions_email);
    setMyOptions_name(myOptions_name);
  };

  // const getDataFromAPI = () => {
  //     console.log("Options Fetched from API")

  //     fetch('http://dummy.restapiexample.com/api/v1/employees').then((response) => {
  //     return response.json()
  //     }).then((res) => {
  //     console.log(res.data)
  //     for (var i = 0; i < res.data.length; i++) {
  //         myOptions.push(res.data[i].employee_name)
  //     }
  //     console.log(myOptions)
  //     setMyOptions(myOptions)
  //     })
  // }

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    limit: 2,
  });

  return (
    <div>
      <div className="inputs">
        <div className="just_text">
          <div className="first_name">
            <p className="Input_Text">First Name:</p>
            {/* <input type="text" value={firstname} onChange={evt => setFirstName(evt)} /> */}
            <TextField
              onChange={(evnt) => setFirstName(evnt)}
              variant="outlined"
            />
          </div>
          <div className="last_name">
            <p className="Input_Text">Last Name:</p>
            {/* <input className="last_name_input" type="text" value={lastname} onChange={evt => setLastName(evt)} /> */}
            <TextField
              onChange={(evnt) => setLastName(evnt)}
              variant="outlined"
            />
          </div>
        </div>

        <div className="email">
          <p className="Input_Text">Email:</p>
          {/* <Autocomplete
                            style={{ width: 500 }}
                            autoComplete
                            autoHighlight
                            filterOptions={filterOptions}
                            options={myOptions_email} 
                            renderInput={(params) => (*/}
          <TextField
            onChange={getCustomers}
            variant="outlined"
            label="Search Box"
          />
          {/*)}
                         /> */}
        </div>
      </div>
    </div>
  );
};

export default Payment_inputs;

{
  /* <p>Number: </p>
            <Autocomplete
                style={{ width: 500 }}
                autoComplete
                filterOptions={filterOptions}
                autoHighlight
                options={myOptions_Nums}
                renderInput={(params) => (
                    <TextField {...params}
                        onChange={getCustomers}
                        variant="outlined"
                        label="Search Box"
                    />
                )}
            /> */
}

{
  /* <p>name:</p>
            <Autocomplete
                style={{ width: 500 }}
                autoComplete
                autoHighlight
                filterOptions={filterOptions}
                options={myOptions_name}
                renderInput={(params) => (
                    <TextField {...params}
                        onChange={getCustomers}
                        variant="outlined"
                        label="Search Box"
                    />
                )}
            /> */
}
