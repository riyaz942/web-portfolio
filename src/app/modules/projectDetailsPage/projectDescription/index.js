import React, { Component, Fragment } from "react";
import map from 'lodash/map';
import styles from './project_description.module.scss';
import Div from 'Common/components/div';
import reactStringReplace from 'react-string-replace';

const parseNewLine = object => {
  //const regexNewLine=/@(\w+)/g
  const newLineMatch = (match, index, offset) => {
    return <br />
  }

  return reactStringReplace(object, "<br/>", newLineMatch)
}

const ProjectDescription = ({ description, className }) => {
  return (
    <Div align="stretch" className={`${styles.description_container} ${className}`}>
      {map(description, description => {
        if (description.type == "text") {
          return <div className={styles.text}>{parseNewLine(description.value)}</div>;
        } else if (description.type == 'points') {

          return (
            <Div className={styles.points_container}>
              {description.title ? <div className={styles.title}>{description.title}</div> : null}
              <ul className={styles.points_ul}>
                {
                  map(description.value, value => (
                    <li>{value}</li>
                  ))
                }
              </ul>
            </Div>
          )
        } else if (description.type == 'header') {
          return (<div className={styles.header}>{description.value}</div>)
        }

        return null;
      })}
    </Div>
  );
};

export default ProjectDescription;
