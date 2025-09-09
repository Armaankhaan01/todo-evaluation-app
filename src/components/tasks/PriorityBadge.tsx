import { Box, Typography, styled } from "@mui/material";
import { getFontColor } from "../../utils";

interface PriorityBadgeProps {
  label: string;
  color: string;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ label, color }) => {
  return (
    <Box bgcolor="white" borderRadius="16px">
      <StyledPriorityBadge backgroundclr={color}>
        <Dot sx={{ backgroundColor: color }} />
        <Typography variant="inherit" color={color}>
          {label}
        </Typography>
      </StyledPriorityBadge>
    </Box>
  );
};

export default PriorityBadge;

const StyledPriorityBadge = styled(Box)<{ backgroundclr?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 2px 16px;
  border-radius: 16px;
  font-weight: bold;
  font-size: 14px;
  background-color: ${({ backgroundclr }) => `${backgroundclr}30`}; /* Faded background */
  color: ${({ backgroundclr }) => getFontColor(backgroundclr || "")};
  height: 32px;
`;

const Dot = styled(Box)`
  width: 8px;
  height: 8px;
  border-radius: 50%;
`;
