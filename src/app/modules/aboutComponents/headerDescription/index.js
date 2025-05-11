import React, { memo } from "react";
import { Transition, config } from "react-spring/renderprops";
import Div from "Common/components/div";
import styles from "./header_description.module.scss";
import ContactComponent from "Common/components/contactComponent";

const HeaderDescription = ({
  showDescription,
  onClickProject,
  onClickTimeline,
  isFirstTime,
}) => {
  function getYearsFromCareerStartDate() {
    const careerStartDate = "2016-05-01T00:00:00";
    const startDate = new Date(careerStartDate);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const diffInMs = currentDate - startDate;

    // Convert milliseconds to years (approximate)
    const msPerYear = 1000 * 60 * 60 * 24 * 365.25; // accounting for leap years
    const diffInYears = diffInMs / msPerYear;

    // Return the difference rounded to 2 decimal places
    return parseFloat(diffInYears.toFixed(2));
  }

  return (
    <Transition
      items={showDescription}
      from={{
        opacity: 0,
        transform: "translateY(calc(50vh - 0px))",
      }}
      enter={{
        opacity: 1,
        transform: "translateY(calc(50vh - 145px))",
      }}
      leave={{
        opacity: 0,
      }}
      config={isFirstTime ? { delay: 300 } : config.default}
    >
      {(showDescription) =>
        showDescription &&
        ((props) => (
          <Div style={props} className={styles.user_description_container}>
            <div className={styles.user_description}>
              Hi, <br />I am <b className={styles.name}>Riyaz Ahmed</b>, A
              Software Developer with{" "}
              {Math.floor(getYearsFromCareerStartDate())}+ years of Software
              Development experience on various Platforms, Passionate to build
              Polished, Innovative and well-detailed Apps with Fluid Animations
              to complement the Design.
              {/* <br/><br/> In my spare time, I usually read or play video games but mostly i try to work on new ideas and learn. */}
            </div>

            <Div row justify align className={styles.user_button_container}>
              Checkout my
              <Div
                align
                className={styles.user_button}
                onClick={onClickTimeline}
              >
                Timeline
                <Underline isFirstTime={isFirstTime} />
              </Div>
              and
              <Div
                align
                className={styles.user_button}
                onClick={onClickProject}
              >
                Technologies
                <Underline isFirstTime={isFirstTime} />
              </Div>
              that I worked on.
            </Div>

            <ContactComponent className={styles.contact_container} />
          </Div>
        ))
      }
    </Transition>
  );
};

const Underline = ({ isFirstTime }) => (
  <Transition
    items={true}
    from={{
      transform: isFirstTime ? "scale(0)" : "scale(1)",
    }}
    enter={{
      transform: "scale(1)",
    }}
    config={{ delay: 800 }}
  >
    {(showUnderline) => (props) =>
      (
        <div
          style={props}
          className={`${styles.underline} ${styles.show_underline}`}
        ></div>
      )}
  </Transition>
);

export default memo(HeaderDescription);
