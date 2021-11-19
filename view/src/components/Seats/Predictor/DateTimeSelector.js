import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";
import { useContext, useState } from "react";
import { PredictorContext } from "./Predictor";

const server = process.env.REACT_APP_SERVER;

const DateTimeContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const StyledDivider = styled("div")(({ theme }) => ({
  margin: `${theme.spacing(1)} 0`,
}));

function DateTimeSelector() {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const { setLoading, setPredicted } = useContext(PredictorContext);

  //=== functions
  const onDateChange = (val) => setDate(val);

  const onTimeChange = (val) => setTime(val);

  const onPredict = () => {
    setLoading(true);
    fetch(server + "/predict", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setPredicted(data);
      });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimeContainer>
        <DatePicker
          label="date"
          onChange={onDateChange}
          value={date}
          renderInput={(params) => <TextField {...params} />}
        />
        <StyledDivider />
        <TimePicker
          label="time"
          onChange={onTimeChange}
          value={time}
          renderInput={(params) => <TextField {...params} />}
        />
        <StyledDivider />
        <Button disabled = {!(date && time)} onClick={onPredict} variant="contained">
          Predict
        </Button>
      </DateTimeContainer>
    </LocalizationProvider>
  );
}

export default DateTimeSelector;
