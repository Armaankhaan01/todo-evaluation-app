import { Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { getFontColor, isDark } from "../../utils";

const RangePickerContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
}));

const StyledDateInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "0px 10px",
    borderRadius: "12px",
    backgroundColor: isDark(theme.palette.secondary.main) ? "#090b2258" : "#ffffff5c",
    color: getFontColor(theme.palette.secondary.main),
    "& .MuiSvgIcon-root": {
      color: getFontColor(theme.palette.secondary.main),
    },
    "&.Mui-focused": {
      backgroundColor: isDark(theme.palette.secondary.main) ? "#090b228e" : "#ffffff8e",
      boxShadow: `0 0 0 4px ${theme.palette.primary.main}64`,
    },
    "& fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

type CustomDatePickerProps = {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
  minDate?: Date;
};

const CustomDatePicker = ({
  selected,
  onChange,
  placeholderText,
  minDate,
}: CustomDatePickerProps) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      placeholderText={placeholderText}
      minDate={minDate}
      customInput={<StyledDateInput variant="outlined" />}
    />
  );
};

type DateRangePickerProps = {
  onRangeSelect: (range: { start: Date; end: Date }) => void;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onRangeSelect }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <RangePickerContainer>
      <CustomDatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        placeholderText="Start Date"
      />
      <CustomDatePicker
        selected={endDate}
        onChange={(date: Date | null) => setEndDate(date)}
        placeholderText="End Date"
        minDate={startDate || undefined}
      />
      <Button
        variant="outlined"
        onClick={() => {
          if (startDate && endDate) {
            onRangeSelect({ start: startDate, end: endDate });
          }
        }}
      >
        Apply
      </Button>
    </RangePickerContainer>
  );
};

export default DateRangePicker;
