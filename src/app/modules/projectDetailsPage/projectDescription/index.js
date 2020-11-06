import React from "react";
import map from 'lodash/map';
import styles from './project_description.module.scss';
import Div from 'Common/components/div';
import { parseNewLine } from 'Common/utils';

const getHighlight = (highlight) => {

  if (highlight) {
    if (highlight == 'green')
      return styles.highlight_green;
    else if (highlight == 'blue')
      return styles.highlight_blue;
  }

  return null;
}

const ProjectDescription = ({ project, className }) => {
  const { description, involvement, tech } = project;

  return (
    <Div align="stretch" className={`${styles.description_container} ${className}`}>
      <Div row justify="space_between" className={styles.sub_info_container}>
        <Div>
          <div className={styles.title}>Platform</div>
          <div className={styles.value}>{tech.join(" | ")}</div>
        </Div>
        <Div align="end">
          <div className={styles.title}>Project Involment</div>
          <div className={styles.value}>{involvement}</div>
        </Div>
      </Div>

      {map(description, (description, index) => {
        if (description.type == "text") {
          return <div key={index} className={`${styles.text} ${getHighlight(description.highlight)}`}>{parseNewLine(description.value)}</div>;
        } else if (description.type == 'points') {

          return (
            <Div key={index} className={`${styles.points_container} ${getHighlight(description.highlight)}`}>
              {description.title ? <div className={styles.title}>{description.title}</div> : null}
              <ul className={styles.points_ul}>
                {
                  map(description.value, (value, index) => (
                    <li key={index}>{value}</li>
                  ))
                }
              </ul>
            </Div>
          )
        } else if (description.type == 'header') {
          return (<div key={index} className={styles.header}>{description.value}</div>)
        }

        return null;
      })}
    </Div>
  );
};

export default ProjectDescription;
