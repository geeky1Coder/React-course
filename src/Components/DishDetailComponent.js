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
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../Shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

function RenderComments({ comments, postComment, dishId }) {
  const comment_content = comments.map((comment) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    if (comment.comment != null) {
      return (
        <Fade in>
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
        </Fade>
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
            <FadeTransform
              in
              transformProps={{
                exitTransform: "scale(0.5) translateY(-50%)",
              }}
            >
              <Card>
                <CardImg
                  top
                  src={baseUrl + props.dish.image}
                  alt={props.dish.name}
                />
                <CardBody>
                  <CardTitle>{props.dish.name}</CardTitle>
                  <CardText>{props.dish.description}</CardText>
                </CardBody>
              </Card>
            </FadeTransform>
          </div>

          <div className="col-md-5 col-sm-12 col-xs-12 mt-2">
            <Stagger in>
              <RenderComments
                comments={props.comments}
                postComment={props.postComment}
                dishId={props.dish.id}
              />
            </Stagger>
            <div className="mt-3 mb-3">
              <CommentForm
                postComment={props.postComment}
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
