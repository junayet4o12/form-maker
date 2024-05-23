/* eslint-disable react/prop-types */
// import React from 'react';

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const WarningModal = ({ open, setOpen }) => {
  const navigate = useNavigate()
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Dialog
      open={open}
      size={'xs'}
      handler={handleClose}
      className="rounded-sm relative bg-black/50 border-primary/50 border-[2px] border-double"
    >
      <div>
        <div className="">
          <DialogHeader className="text-primary">You're not logged in yet!!</DialogHeader>
          <DialogBody className="text-white">
          Please login to Formify to create your own forms and share them with others for collecting data. Logging in also provides access to additional features.
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleClose}
              className="mr-3 rounded-sm border border-primary/60 bg-primary/10 hover:border-primary"
            >
              <span className="text-white ">Later</span>
            </Button>
            <Button
              onClick={() => navigate('/accountPortal')}
              className="bg-primary/80 hover:bg-primary rounded-sm border border-primary"
            >
              <span>Log in</span>
            </Button>
          </DialogFooter>
        </div>
        <div className="absolute top-0  blur-2xl w-full h-full -z-10">
        </div>
      </div>
    </Dialog>
  );
};

export default WarningModal;