import React, { memo } from 'react';
import { useSpring, useTransition, animated } from 'react-spring';
import profilePic from "Images/profile-pic.jpeg";
import styles from './profile_pic.module.scss';

const ProfilePic = ({ isFirstTime, isFullScreen, onClickProfilePic, screenSize }) => {
  {/* Only Animates first time when the user image is shown */ }
  const showMobileResponsive = screenSize == 'sm' || screenSize == 'md';

  const transitionFrom = showMobileResponsive ? 'translate(calc(75px - 50vw), calc(50vh - 100px)) scale(1)' : 'translate(calc(100px - 50vw), calc(50vh - 100px)) scale(1)';
  const transitionTo = showMobileResponsive ? 'translate(calc(75px - 50vw), calc(50vh - 225px)) scale(1)' : 'translate(calc(100px - 50vw), calc(50vh - 250px)) scale(1)';

  const springTranslateFrom = showMobileResponsive ? 'translate(calc(75px - 50vw), calc(50vh - 225px)) scale(1)' :'translate(calc(100px - 50vw), calc(50vh - 250px)) scale(1)';
  const springTranslateTo = showMobileResponsive ? 'translate(calc(-40px - 0vw), calc(0vh - -10px)) scale(0.3)' :'translate(calc(-40px - 0vw), calc(0vh - -10px)) scale(0.25)'; // only difference is scale value

  const shadowFrom = showMobileResponsive ? '0px 3px 12px 2px rgba(0, 0, 0, 0.35)' : '0px 5px 12px 3px rgba(0, 0, 0, 0.35)';
  const shadowTo = showMobileResponsive ? '0px 3px 12px 2px rgba(0, 0, 0, 0)' : '0px 5px 12px 3px rgba(0, 0, 0, 0)';

  const transition = useTransition(true, null, {
    from: { opacity: 0, transform: transitionFrom },
    enter: { opacity: 1, transform: transitionTo },
    leave: { opacity: 0 },
    config: { delay: 600 }
  });

  const springProps = useSpring({
    to: {
      userPicTranform: isFullScreen
        ? springTranslateFrom
        : springTranslateTo,
      boxShadow: isFullScreen
        ? shadowFrom
        : shadowTo,
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
          key="profile-pic"
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
