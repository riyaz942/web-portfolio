import React, {
  Fragment,
  memo,
  useRef,
  useState,
  useEffect,
} from "react";
import { animated } from "react-spring";
import styles from './element_scroll.module.scss';
import Div from "Common/components/div";
import useBreakpoint from 'Common/hooks/useBreakpoint';

const ElementScroll = ({
  project,
  st,
  imageRef,
  imgPosition,
  containerOpacityAnimation,
  showContent,
}) => {
  const imageWidth = 150;
  const [titleWidth, setTitleWidth] = useState(100);
  const titleRef = useRef(null);
  const screenSize = useBreakpoint();

  useEffect(() => {
    setTitleWidth(titleRef.current.getBoundingClientRect().width);
  }, []);

  // ------------------------------------------------IMAGE ANIMATION
  const imgTopAnim = st.interpolate(o => (70 - o / 2 > 0 ? 70 - o / 2 : 0));
  const imgWidthAnim = st.interpolate(o =>
    imageWidth - o / 1.5 > 48 ? imageWidth - o / 1.5 : 48
  );
  const imgLeftAnim = st.interpolate(
    o =>
      `calc(${50 - o / 1.5 / 3 > 0 ? 50 - o / 1.5 / 3 : 0}% - ${
      imageWidth / 2 - o / 1.5 > 0 ? imageWidth / 2 - o / 1.5 : 0
      }px)`
  );

  // ------------------------------------------------TITLE ANIMATION
  // title width calculation
  // the original width of the title is 18 px and displaying with scale(2) makes it 32px
  // the title width needs to be calculated 18px font-size / 2
  // but the titleWidth getBoundClient is returning the size which is displayed 32px
  // so to get 18px/2 which is the original title width size by half
  // we calulate it as 32px/4
  const titleTopAnim = st.interpolate(o => (220 - o / 1.1 > 0 ? 220 - o / 1.1 : 0) + 14);
  const titleLeftAnim = st.interpolate(o => titleWidth / 4 + o / 7 > 60 ? 60 : titleWidth /4 + o / 7);
  const titleLeftAnimResposive = st.interpolate(o => `calc(${50 - o / 3 > 0 ? 50 - o / 3 : 0}% - ${titleWidth /4 - o / 1.5 > 0 ? titleWidth /4 - o / 1.5 : 0}px + ${o / 2.5 < 60 ? o / 2.5 : 60}px)`);
  const titleSizeAnim = st.interpolate(o => `scale(${2 - o / 2 / 100 < 1 ? 1 : 2 - o / 2 / 100})`);

  // -----------------------------------------------SUB DETAIL ANIMATION
  const subDetailsTop = st.interpolate(o =>
    220 - o / 1.1 > 0 ? 220 - o / 1.1 : 0
  );
  const subDetailsAlpha = st.interpolate(o =>
    1 - o / 150 > 0 ? 1 - o / 150 : 0
  );

  return (
    <Fragment>
      <animated.img
        ref={imageRef}
        className={styles.project_image}
        src={project.icon}
        style={{
          width: imgWidthAnim,
          height: imgWidthAnim,
          left: imgLeftAnim,
          top: imgTopAnim,
          opacity: !imgPosition
            ? containerOpacityAnimation.opacity
            : showContent
              ? 1
              : 0
        }}
      />

      <animated.div
        ref={titleRef}
        className={styles.project_name}
        style={{
          transform: titleSizeAnim,
          left: screenSize == 'sm' ? titleLeftAnimResposive : titleLeftAnim,
          top: titleTopAnim,
          opacity: containerOpacityAnimation.opacity
        }}
      >
        {project.name}
      </animated.div>

      <Div
        animate
        align="end"
        style={{
          top: subDetailsTop,
          opacity: showContent
            ? subDetailsAlpha
            : containerOpacityAnimation.opacity
        }}
        className={styles.project_sub_details_container}
      >
        <div className={styles.title}>Platform</div>
        <div className={styles.value}>{project.tech.join(" | ")}</div>

        <div className={`${styles.title} ${styles.project_involvement}`}>
          Project Involment
        </div>
        <div className={styles.value}>{project.involvement}</div>
      </Div>
    </Fragment>
  );
};

export default memo(ElementScroll);
