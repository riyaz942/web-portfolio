import React, { Component } from "react";
import styles from "./project_view_pager.module.scss";
import PaginationButton from "Common/components/paginationButton";
import Div from "Common/components/div";
import Swiper from 'react-id-swiper';
import map from 'lodash/map';
import {getProjectImages} from 'Constants/projectImageConstants';

class ProjectViewPager extends Component {
  render() {
    const { match, projectId } = this.props;
    const params = {
      containerClass: "custom_container",
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
      }
    };
    const projectImages = getProjectImages(projectId);
    console.log('projectImages: ', projectImages);
    return (
      <Div fillParent className={styles.swiper_container}>
        <Swiper
          {...params}>
          {
            map(projectImages, projectImage => (
              <img className={styles.swiper_item} src={projectImage} />
            ))
          }
        </Swiper>

        <Div align row justify="space_between" className={styles.pagination_container}>
          <PaginationButton />
          <PaginationButton isRight />
        </Div>
      </Div>
    );
  }
}

export default ProjectViewPager;
