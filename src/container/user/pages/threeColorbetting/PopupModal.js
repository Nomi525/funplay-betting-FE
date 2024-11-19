import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PopupModal = React.memo(
  ({
    show,
    handleClose,
    title,
    color,
    startBattle,
    onContractCountChange,
    socketTimer,
  }) => {
    const defaultMoney = 10;
    const [contractCount, setContractCount] = useState(1);
    const [selectedMoney, setSelectedMoney] = useState(defaultMoney);
    const [betAmount, setBetAmount] = useState(defaultMoney);

    useEffect(() => {
      const newBetAmount = selectedMoney * contractCount;
      setBetAmount(newBetAmount);
      onContractCountChange(contractCount);
    }, [selectedMoney, contractCount, onContractCountChange]);

    const handleContractChange = useCallback((type) => {
      setContractCount((prev) => {
        const newCount =
          type === "increment" ? prev + 1 : Math.max(1, prev - 1);
        return newCount;
      });
    }, []);

    const handleMoneyChange = useCallback((value) => {
      setSelectedMoney(value);
    }, []);

    const handleReset = useCallback(() => {
      setContractCount(1);
      setSelectedMoney(defaultMoney);
      onContractCountChange(1);
      handleClose();
    }, [handleClose, onContractCountChange]);

    useEffect(() => {
      if (socketTimer >= 0 && socketTimer <= 5) {
        handleReset();
      }
    }, [socketTimer, handleReset]);

    if (!show) return null;

    return (
      <Modal
        open={show}
        onClose={handleReset}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          bgcolor="background.paper"
          p={0}
          borderRadius={2}
          boxShadow={24}
          sx={{ width: { xs: "90%", sm: 400 }, maxWidth: "100%" }}
        >
          <Box
            sx={{
              background: color,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" color="white">
              Join {title}
            </Typography>
            <IconButton onClick={handleReset} color="inherit">
              <CloseIcon />
            </IconButton>
          </Box>
          <Box p={4}>
            <FormControl component="fieldset">
              <Typography variant="subtitle1" gutterBottom>
                Contract Money
              </Typography>
              <RadioGroup
                row
                value={selectedMoney}
                onChange={(e) => handleMoneyChange(Number(e.target.value))}
              >
                {[10, 100, 1000, 10000].map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio />}
                    label={value.toString()}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Box my={2}>
              <Typography variant="subtitle1" gutterBottom>
                Contract Count
              </Typography>
              <Box display="flex" alignItems="center">
                <Button
                  onClick={() => handleContractChange("decrement")}
                  variant="outlined"
                >
                  -
                </Button>
                <Typography variant="body1" mx={2}>
                  {contractCount}
                </Typography>
                <Button
                  onClick={() => handleContractChange("increment")}
                  variant="outlined"
                >
                  +
                </Button>
              </Box>
              <Typography variant="body1" mt={2}>
                Total Bet Amount: {betAmount}
              </Typography>
            </Box>
            <FormControlLabel
              control={<Checkbox checked />}
              label="I agree to the PRESALE RULE"
            />
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button
                onClick={handleReset}
                variant="contained"
                color="secondary"
                sx={{ mx: 1 }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  startBattle();
                  handleReset();
                }}
                variant="contained"
                color="primary"
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    );
  }
);

export default PopupModal;
