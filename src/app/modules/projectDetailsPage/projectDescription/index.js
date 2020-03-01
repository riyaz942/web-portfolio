import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import map from 'lodash/map';

const ProjectDescription = ({ description }) => {
  return (
    <Fragment>
      {map(description, description => {
        if (description.type != "text") {
          return <div>{description.value}</div>;
        }

        return null;
      })}
    </Fragment>
  );
};

export default ProjectDescription;
