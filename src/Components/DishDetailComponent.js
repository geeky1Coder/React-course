import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm.js";
import { addComment } from "../redux/ActionCreators.js";
import { Loading } from "./LoadingComponent";

function RenderComments({ comments, addComment, dishId }, props) {
  const comment_content = comments.map((comment) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    if (comment.comment != null) {
      return (
        <React.Fragment>
          <div key="comment.id">
            <ListGroup>
              <ListGroupItem>{comment.comment}</ListGroupItem>
              <ListGroupItem>
                -- {comment.author} ,{" "}
                {new Date(comment.date).toLocaleDateString("en-US", options)}
              </ListGroupItem>
            </ListGroup>
          </div>
        </React.Fragment>
      );
    } else {
      return <div></div>;
    }
  });

  if (comments)
    return (
      <div>
        <h4>COMMENTS</h4>
        {comment_content}
      </div>
    );
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 col-sm-12 col-xs-12 mt-2">
            <Card>
              <CardImg top src={props.dish.image} alt={props.dish.name} />
              <CardBody>
                <CardTitle>{props.dish.name}</CardTitle>
                <CardText>{props.dish.description}</CardText>
              </CardBody>
            </Card>
          </div>

          <div className="col-md-5 col-sm-12 col-xs-12 mt-2">
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id}
            />
            <div className="mt-3 mb-3">
              <CommentForm
                addComment={props.addComment}
                dishId={props.dish.id}
              ></CommentForm>
            </div>
          </div>
        </div>
      </div>
    );
  } else return <div></div>;
};

export default DishDetail;
