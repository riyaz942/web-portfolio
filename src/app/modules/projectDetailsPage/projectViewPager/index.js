import React, { Component, useEffect, useRef } from "react"
import styles from "./project_view_pager.module.scss"
import PaginationButton from "Common/components/paginationButton"
import Div from "Common/components/div"
import Swiper from "react-id-swiper"
import map from "lodash/map"
import { getProjectImages } from "Constants/projectImageConstants"

class ProjectViewPager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: props.initialSlide,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { initialSlide } = nextProps;
    if (this.swiper && typeof initialSlide == 'number') {
      this.swiper.slideTo(initialSlide);
    }
  }

  render() {
    const { projectId, initialSlide } = this.props;
    const { currentSlide } = this.state;

    const params = {
      containerClass: "custom_container",
      initialSlide,
      zoom: {
        maxRatio: 2,
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      on: {
        slideChange: () => {
          if (this.swiper)
            this.setState({ currentSlide: this.swiper.realIndex });
        },
      },
    };
    const projectImages = getProjectImages(projectId);
    const totalItems = projectImages ? projectImages.length : 0;

    return (
      <Div align justify fillParent className={styles.swiper_container}>
        <Swiper
          {...params}
          getSwiper={(swiper) => {
            this.swiper = swiper;
          }}
        >
          {map(projectImages, (projectImage, index) => (
            <div className="swiper-zoom-container" key={index}>
              <img className={styles.swiper_item} src={projectImage.image} />
            </div>
          ))}
        </Swiper>

        <PaginationButton
          isEnabled={currentSlide != 0}
          onClick={() => this.swiper.slidePrev()}
          className={styles.pagination_button_left}
        />
        <PaginationButton
          isRight
          isEnabled={currentSlide < totalItems - 1}
          onClick={() => this.swiper.slideNext()}
          className={styles.pagination_button_right}
        />
      </Div>
    );
  }
}

ProjectViewPager.defaultProps = {
  initialSlide: 0,
};

export default ProjectViewPager;
