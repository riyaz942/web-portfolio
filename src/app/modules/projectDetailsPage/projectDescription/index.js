import React, { Component, Fragment } from "react";
import map from 'lodash/map';
import styles from './project_description.module.scss';
import Div from 'Common/components/div';
import { parseNewLine } from 'Common/utils';

const getHighlight = (highlight) => {

  if(highlight) {
    if (highlight == 'green')
      return styles.highlight_green;
    else if (highlight == 'blue') 
      return styles.highlight_blue;
  }

  return null;
}

const ProjectDescription = ({ description, className }) => {
  return (
    <Div align="stretch" className={`${styles.description_container} ${className}`}>
      {map(description, description => {
        if (description.type == "text") {
          return <div className={`${styles.text} ${getHighlight(description.highlight)}`}>{parseNewLine(description.value)}</div>;
        } else if (description.type == 'points') {

          return (
            <Div className={`${styles.points_container} ${getHighlight(description.highlight)}`}>
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
