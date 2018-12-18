import React from 'react';
import AceEditor from 'react-ace';
import { FormGroup, Input, Label } from 'reactstrap';
import InfoBtnModal from './InfoBtnModal';

const editorValue = JSON.stringify(
  {
    eventName: 'Birthday Party',
    members: [
      {
        name: 'John Doe',
      },
      {
        name: 'Jimmy Joe',
      },
    ],
  },
  null,
  4,
);

/* tslint:disable-next-line:variable-name */
const InfoPayload = () => (
  <InfoBtnModal title="Info Payload">
    Add the payload / body the api expects. Use the input fields using the $ dot
    notation as explained in the general help section to denote input fields.
    <br />
    You may choose to change the syntax highlighting of the editor by changing
    the value to the right to some other serialization format. This however will
    not affect the actual request. Make sure to add the content-type of the
    request in the headers section.
  </InfoBtnModal>
);

export default InfoPayload;
