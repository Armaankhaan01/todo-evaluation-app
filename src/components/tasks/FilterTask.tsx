import { Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import {
  CalendarTodayRounded,
  TodayRounded,
  ViewWeekRounded,
  DateRangeRounded,
} from "@mui/icons-material";
import { getFontColor, isDark } from "../../utils";
import DateRangePicker from "./DateRangePicker";

type FilterSectionProps = {
  onFilterChange: (
    filter: "all" | "today" | "week" | "custom",
    customRange?: { start: Date; end: Date },
  ) => void;
};

const filterOptions = [
  { value: "all", label: "All Tasks", icon: <CalendarTodayRounded fontSize="small" /> },
  { value: "today", label: "Today", icon: <TodayRounded fontSize="small" /> },
  { value: "week", label: "This Week", icon: <ViewWeekRounded fontSize="small" /> },
  { value: "custom", label: "Custom", icon: <DateRangeRounded fontSize="small" /> },
];

const FilterSection: React.FC<FilterSectionProps> = ({ onFilterChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "today" | "week" | "custom">("all");

  const open = Boolean(anchorEl);

  const currentFilter = filterOptions.find((opt) => opt.value === selectedFilter);
  const handleOptionSelect = (option: string) => {
    handleClose();
    if (option === "custom") {
      setCustomModalOpen(true);
      setSelectedFilter(option as "all" | "today" | "week" | "custom");
    } else {
      setCustomModalOpen(false);
      setSelectedFilter(option as "all" | "today" | "week" | "custom");
      onFilterChange(option as "all" | "today" | "week" | "custom");
    }
  };

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleCustomRangeChange = (range: { start: Date; end: Date }) => {
    onFilterChange("custom", range);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        mb: "8px",
        justifyContent: "between",
      }}
    >
      <FilterButton
        onClick={handleOpen}
        aria-controls={open ? "filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        fullWidth={!customModalOpen}
      >
        <ButtonContent>
          <Typography variant="body2">Filter</Typography>
          <Typography variant="subtitle2">{currentFilter?.label}</Typography>
        </ButtonContent>
      </FilterButton>

      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "18px",
            minWidth: "200px",
            width: "max-content",
            boxShadow: "none",
            padding: "4px",
          },
        }}
      >
        {filterOptions.map(({ value, label, icon }) => (
          <StyledMenuItem key={value} onClick={() => handleOptionSelect(value)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </StyledMenuItem>
        ))}
      </Menu>

      {customModalOpen && <DateRangePicker onRangeSelect={handleCustomRangeChange} />}
    </Box>
  );
};

export default FilterSection;

const StyledMenuItem = styled(MenuItem)`
  margin: 0 6px;
  padding: 12px;
  border-radius: 12px;
  gap: 8px;
`;

const FilterButton = styled(Button)`
  gap: 8px;
  text-transform: none;
  border-radius: 16px;
  height: 60px;
  padding: 16px 28px;
  background: ${({ theme }) => (isDark(theme.palette.secondary.main) ? "#090b2258" : "#ffffff3e")};
  color: ${({ theme }) => getFontColor(theme.palette.secondary.main)};
  border: 1px solid
    ${({ theme }) =>
      isDark(theme.palette.secondary.main) ? "#44479cb7" : theme.palette.primary.main};
`;

const ButtonContent = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;
