import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

interface IProps {
  title: string;
  btnSize?: SizeProp;
  btnColor?: string;
}

interface IState {
  modalOpen: boolean;
}

class InfoBtnModal extends React.Component<IProps, IState> {
  public state: IState = {
    modalOpen: false,
  };

  public toggleModal = () => {
    this.setState((state) => ({
      modalOpen: !state.modalOpen,
    }));
  };

  public render() {
    return (
      <>
        <span className="cursor-hand" onClick={this.toggleModal}>
          <FontAwesomeIcon
            className="cursor-hand"
            icon="info-circle"
            size={this.props.btnSize || 'sm'}
            color={this.props.btnColor || 'lightblue'}
          />
        </span>
        <Modal
          isOpen={this.state.modalOpen}
          toggle={this.toggleModal}
          size="lg"
        >
          <ModalHeader toggle={this.toggleModal}>
            {this.props.title}
          </ModalHeader>
          <ModalBody>{this.props.children}</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default InfoBtnModal;