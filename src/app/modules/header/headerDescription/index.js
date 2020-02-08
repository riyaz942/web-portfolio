import React, { Component } from "react";
import PropTypes from "prop-types";
import { Transition } from "react-spring/renderprops";
import Div from 'Common/components/div';
import styles from './header_description.module.scss';

class HeaderDescription extends Component {
  render() {
    const { showDescription, onClickProject, onClickTimeline } = this.props;

    return (
      <Transition
        items={showDescription}
        from={{
          opacity: 0,
          marginTop: "100px"
        }}
        enter={{
          opacity: 1,
          marginTop: "36px"
        }}
        leave={{
          opacity: 0
        }}
      >
        {showDescription =>
          showDescription &&
          (props => (
            <Div style={props} className={styles.user_description_container}>
              <div className={styles.user_description}>
                So here there will be a description about my self. might be long
                or something
              </div>

              <Div row justify className={styles.user_button_container}>
                <div
                  className={styles.user_button}
                  onClick={onClickTimeline}
                >
                  Timeline
                </div>
                <div
                  className={styles.user_button}
                  onClick={onClickProject}
                >
                  Projects
                </div>
              </Div>
              {/* <div>git hub link and any social media link</div> */}
            </Div>
          ))
        }
      </Transition>
    );
  }
}

export default HeaderDescription;
