import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Row,
  Col,
  Label,
  Input,
} from "reactstrap";
import { LocalForm, Errors, Control, actions } from "react-redux-form";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
  }
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  handelSubmit(values) {
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.textContent
    );
    alert(JSON.stringify(values));
  }
  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil "></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm
              onSubmit={(values) => {
                this.handelSubmit(values);
              }}
            >
              <Row className="form-group">
                <Col md={{ size: 12, offset: 0 }}>
                  <label htmlFor="Rating" md={2}>
                    Rating
                  </label>
                  <Control.select
                    model=".rating"
                    type="select"
                    name="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 12, offset: 0 }}>
                  <label htmlFor="YourName" md={2}>
                    Your Name
                  </label>
                  <Control.text
                    model=".author"
                    type="text"
                    name="author"
                    className="form-control"
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  ></Control.text>
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <label htmlFor="Comment" className="ml-3">
                  Comment
                </label>
                <Col md={{ size: 12 }}>
                  <Control.textarea
                    model=".textContent"
                    name="textContent"
                    rows="7"
                    cols="63"
                    id="textContent"
                  ></Control.textarea>
                </Col>
              </Row>
              <Row>
                <Col md={{ size: 10, offset: 0 }}>
                  <Button type="submit" color="primary">
                    SUBMIT
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CommentForm;
