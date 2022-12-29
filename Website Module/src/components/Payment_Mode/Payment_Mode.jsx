import React from "react";
import { makeStyles } from "@material-ui/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import "./Payment_Mode.css";

const Payment_Mode = () => {
  const [value, setValue] = React.useState("female");
  // console.log(value);
  function handleChange(event) {
    setValue(event.target.value);
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    group: {},
  }));

  const classes = useStyles();

  return (
    <div className="pay_mode_container">
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup
            aria-label="Payment_Mode"
            name="Payment_Mode"
            className={classes.group}
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="Cash"
              control={<Radio />}
              label={<h3>Cash</h3>}
            />
            <FormControlLabel
              value="Coins"
              control={<Radio />}
              label={<h3>Coins</h3>}
            />
            <FormControlLabel
              value="UPI"
              control={<Radio />}
              label={<h3>UPI</h3>}
            />
            {/* <FormControlLabel
                                value="disabled"
                                disabled
                                control={<Radio />}
                                label="(Disabled option)"
                            /> */}
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};
export default Payment_Mode;
