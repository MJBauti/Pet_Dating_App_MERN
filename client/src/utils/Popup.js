import { MDBPopover, MDBPopoverBody, MDBPopoverHeader } from "mdb-react-ui-kit";
import React from "react";

export function Popup({ content, children }) {
  return (
    <MDBPopover placement="bottom">
      {children}
      <MDBPopoverHeader>Popover Header</MDBPopoverHeader>
      <MDBPopoverBody>{content}</MDBPopoverBody>
    </MDBPopover>
  );
}

export default Popup;