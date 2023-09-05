import React, { useState } from "react";
import { AddTicket, DialogBody } from "./styles";
import {
  useCreateTicketMutation,
  useGetMyTicketsQuery,
} from "../../app/services/ticketApi";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { TicketsContainer } from "../all-tickets/styles";
import Ticket from "../ticket";
import { ButtonLoader, RightPageLoader } from "../loader";
import { createNotification } from "../notification";

const RaiseQueryModal = ({ open, setOpen }) => {
  const [title, setTitle] = useState("");
  const [createTicket, { isLoading }] = useCreateTicketMutation();
  const handleClose = () => {
    setTitle("");
    setOpen(false);
  };

  const handleCreate = async () => {
    const { data, error } = await createTicket({ body: { title } });
    if (data?.success) {
      createNotification(data?.msg || "Created", "info", 2000);
      handleClose();
    } else {
      createNotification(
        error?.data?.msg || "Something went wrong",
        "error",
        2000
      );
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Raise a query</DialogTitle>
      <DialogContent>
        <DialogBody>
          <TextField
            name="text"
            label="Query"
            variant="outlined"
            color="primary"
            className="query-input  "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
        </DialogBody>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="error"
          style={{ width: "100px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreate}
          autoFocus
          variant="outlined"
          color="primary"
          disabled={!title || title === ""}
          style={{ width: "100px" }}
        >
          {isLoading ? <ButtonLoader /> : "Raise"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const MyTicketsComp = () => {
  const { data, isLoading, isFetching } = useGetMyTicketsQuery();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AddTicket>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Raise a Query
        </Button>
      </AddTicket>
      {isLoading || isFetching ? (
        <RightPageLoader />
      ) : (
        <TicketsContainer>
          {data?.data?.map((item, index) => (
            <Ticket data={item} key={index} />
          ))}
        </TicketsContainer>
      )}
      <RaiseQueryModal open={open} setOpen={setOpen} />
    </>
  );
};

export default MyTicketsComp;
