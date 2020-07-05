import React from "react";
import { Media } from "reactstrap";

function RenderLeaders(props) {
  const leaders = props.leaders.map((leader) => {
    return (
      <Media className="mb-5">
        <Media left href="#">
          <Media
            className="mr-5"
            object
            src={leader.image}
            alt="Generic placeholder image"
          />
        </Media>
        <Media body>
          <Media className="mb-4" heading>
            {leader.name}
          </Media>
          <h6 className="mb-3">{leader.designation}</h6>
          {leader.description}
        </Media>
      </Media>
    );
  });
  return <React.Fragment>{leaders}</React.Fragment>;
}
export default RenderLeaders;
