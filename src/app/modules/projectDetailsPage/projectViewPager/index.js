import React, { Component } from "react";
import styles from "./project_view_pager.module.scss";
import PaginationButton from "Common/components/paginationButton";
import Div from "Common/components/div";

class ProjectViewPager extends Component {
  render() {
    return (
      <Div row justify="space_between" className={styles.pagination_container}>
        <PaginationButton />
        <PaginationButton isRight />
      </Div>
    );
  }
}

export default ProjectViewPager;
