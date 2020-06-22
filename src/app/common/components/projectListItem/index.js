import React, { Component } from 'react';
import styles from './project_list_item.module.scss';
import Div from 'Common/components/div';

const ProjectListItem = ({ index, slide, onClickProject, style, className }) => {

  return (
    <div
      ref={slide.slideRef}
      onClick={() => onClickProject(slide)}
      style={{ ...style, zIndex: index }}
      className={`${styles.slide_items} ${className} ${
        slide.state == "CENTERED" ? styles.is_selected : ""
        }`}
    >
      <Div fillParent align justify>
        <img
          ref={slide.imgRef}
          src={slide.icon}
          className={styles.image}
        />
      </Div>

      <Div
        alignSelf="stretch"
        justify="start"
        align="end"
        className={styles.title_container}
      >
        <div className={styles.title}>{slide.name}</div>
        <div className={styles.description}>
          {slide.tech.join(" | ")}
        </div>
        <div className={styles.overlay_view_project}>
          View Project
      </div>
      </Div>
      <div
        className={styles.bottom_background_gradient}
      ></div>
    </div>
  )
}

ProjectListItem.defaultProps ={
  index: 0,
  className: ''
}

export default ProjectListItem;
