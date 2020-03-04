import React, { Component } from "react";
import styles from "./project_view_pager.module.scss";
import PaginationButton from "Common/components/paginationButton";
import Div from "Common/components/div";
import Swiper from 'react-id-swiper';
// import "swiper/css/swiper.css";

class ProjectViewPager extends Component {
  render() {
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
    return (
      <Div fillParent className={styles.swiper_container}>
        <Swiper
          {...params}>
          <div className={styles.swiper_item}>Slide 1</div>
          <div className={styles.swiper_item}>Slide 2</div>
          <div className={styles.swiper_item}>Slide 3</div>
          <div className={styles.swiper_item}>Slide 4</div>
          <div className={styles.swiper_item}>Slide 5</div>
        </Swiper>

        {/* <Div row justify="space_between" className={styles.pagination_container}>
        <PaginationButton />
        <PaginationButton isRight />
      </Div> */}
      </Div>
    );
  }
}

export default ProjectViewPager;
