import styled from "@emotion/styled";
import { ExpandMoreRounded } from "@mui/icons-material";
import {
  Box,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  CSSProperties,
} from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Priority } from "../../types/user";

interface PrioritySelectProps {
  selectedPriority: Priority | undefined;
  onPriorityChange: (priority: Priority | undefined) => void;
  width?: CSSProperties["width"];
  fontColor?: CSSProperties["color"];
}

export const PrioritySelect: React.FC<PrioritySelectProps> = ({
  selectedPriority,
  onPriorityChange,
  width,
  fontColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);

  const handlePriorityChange = (event: SelectChangeEvent<unknown>) => {
    const selectedLabel = event.target.value as string;

    const selectedPriority = user.priorities.find((p) => p.id === selectedLabel);
    console.log(selectedPriority);

    onPriorityChange(selectedPriority);
  };

  return (
    <FormControl sx={{ width: width || "100%" }}>
      <FormLabel
        sx={{ color: fontColor ? `${fontColor}e8` : "#555", marginLeft: "8px", fontWeight: 500 }}
      >
        Priority
      </FormLabel>

      <StyledSelect
        value={selectedPriority?.id}
        onChange={handlePriorityChange}
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        IconComponent={() => (
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer", height: "fit" }}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <ExpandMoreRounded
              sx={{
                marginRight: "14px",
                color: fontColor || "#333",
                transform: isOpen ? "rotate(180deg)" : "none",
              }}
            />
          </Box>
        )}
        displayEmpty
        renderValue={() => {
          const selected = user.priorities.find((p) => p.id === selectedPriority?.id);
          return selected ? (
            <PriorityBadge clr={selected.color}>
              <PriorityDot clr={selected.color} />
              {selected.label}
            </PriorityBadge>
          ) : (
            <Box sx={{ color: fontColor }}>Select Priority</Box>
          );
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
              zIndex: 9999,
              padding: "8px",
            },
          },
        }}
      >
        {user.priorities.map((option) => (
          <PriorityMenuItem key={option.id} value={option.id} clr={option.color}>
            <PriorityDot clr={option.color} />
            {option.label}
          </PriorityMenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

const StyledSelect = styled(Select)<{ width?: CSSProperties["width"] }>`
  margin: 2px 0;
  border-radius: 16px !important;
  transition: 0.3s all;
  width: ${({ width }) => width || "100%"};
  z-index: 999;
  border: none !important;
`;

const PriorityMenuItem = styled(MenuItem)<{ clr: string }>`
  padding: 12px 16px;
  border-radius: 12px;
  margin: 6px;
  display: flex;
  align-items: center;
  font-weight: 600;
  gap: 8px;
  color: ${(props) => getFontColor(props.clr)};
  background: ${({ clr }) => clr};

  &:hover {
    opacity: 0.85;
  }

  &.Mui-selected {
    background: ${({ clr }) => clr};
    font-weight: 800;
  }
`;

const PriorityBadge = styled(Box)<{ clr?: string }>`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 12px;
  background: ${({ clr }) => (clr ? `${clr}20` : "#ddd")};
  color: ${({ clr }) => clr || "#333"};
  font-weight: 600;
  gap: 8px;
`;

const PriorityDot = styled(Box)<{ clr: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ clr }) => clr};
  flex-shrink: 0;
`;

function getFontColor(bgColor: string): string {
  // Simple luminance calculation for contrast
  const c = bgColor.substring(1); // remove #
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  return luma > 186 ? "#000" : "#fff";
}
