import React, { memo } from 'react';
import { useSpring, useTransition, animated } from 'react-spring';
import profilePic from "Images/profile-pic.jpeg";
import styles from './profile_pic.module.scss';

const ProfilePic = ({ isFirstTime, isFullScreen, onClickProfilePic }) => {
  {/* Only Animates first time when the user image is shown */ }
  const transition = useTransition(true, null, {
    from: { opacity: 0, transform: "translate(calc(100px - 50vw), calc(50vh - 100px)) scale(1)" },
    enter: { opacity: 1, transform: "translate(calc(100px - 50vw), calc(50vh - 250px)) scale(1)" },
    leave: { opacity: 0 },
    config: { delay: 600 }
  });

  const springProps = useSpring({
    to: {
      userPicTranform: isFullScreen
        ? "translate(calc(100px - 50vw), calc(50vh - 250px)) scale(1)"
        : "translate(calc(-40px - 0vw), calc(0vh - -10px)) scale(0.25)",
      boxShadow: isFullScreen
        ? "0px 5px 12px 3px rgba(0, 0, 0, 0.35)"
        : "0px 5px 12px 3px rgba(0, 0, 0, 0)",
    },
    config: {
      mass: 1,
      tension: 200,
      fiction: 20
    }
  })

  return (
    transition.map(({ item, props: transitionProps }) => (
      item && (
        <animated.img
          style={{
            opacity: transitionProps.opacity,
            boxShadow: springProps.boxShadow,
            transform: isFirstTime ? transitionProps.transform : springProps.userPicTranform
          }}
          src={profilePic}
          className={`${styles.user_pic} ${
            !isFullScreen ? styles.user_pic_clickable : ""
            }`}
          onClick={onClickProfilePic}
        />
      )
    )
    )
  )
}

export default memo(ProfilePic);
