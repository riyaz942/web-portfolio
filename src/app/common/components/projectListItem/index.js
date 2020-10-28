import React from "react";
import styles from "./project_list_item.module.scss";
import Div from "Common/components/div";
import { useHistory, Link } from "react-router-dom";

const ProjectListItem = ({ index, project, style, className }) => {
  const history = useHistory();

  const onClickContainer = event => {
    const { currentTarget } = event;
    const containerRect = currentTarget.querySelector("#project-container").getBoundingClientRect();
    const imageRect = currentTarget.querySelector("#project-image").getBoundingClientRect();

    history.push(`/project/${project.slug}`, { containerRect, imageRect });
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Link
      to={`/project/${project.slug}`}
      className={styles.project_link}
      onClick={onClickContainer}
    >
      <div
        id="project-container"
        style={{ ...style, zIndex: index }}
        className={`${styles.slide_items} ${className} ${
          project.state == "CENTERED" ? styles.is_selected : ""
        }`}
      >
        <Div fillParent align justify>
          <img
            id="project-image"
            src={project.icon}
            className={styles.image}
          />
        </Div>

        <Div
          alignSelf="stretch"
          justify="start"
          align="end"
          className={styles.title_container}
        >
          <div className={styles.title}>{project.name}</div>
          <div className={styles.description}>{project.tech.join(" | ")}</div>
          <div className={styles.overlay_view_project}>View Project</div>
        </Div>
        <div className={styles.bottom_background_gradient}></div>
      </div>
    </Link>
  );
};

ProjectListItem.defaultProps = {
  index: 0,
  className: ""
};

export default ProjectListItem;
