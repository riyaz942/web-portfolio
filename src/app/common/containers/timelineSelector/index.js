import React, { Component, Fragment } from "react";
import Div from "Common/components/div";
import styles from "./timeline_selector.module.scss";
import map from "lodash/map";
import { Spring } from "react-spring/renderprops";

class TimelineSelector extends Component {

  onClickitemItem = selecteditem => {
    const { onItemSelected, listValue, selectedId } = this.props;
    const currentIndex = listValue.findIndex(item => item.id === selectedId);
    const selectedIndex = listValue.findIndex(
      item => item.id == selecteditem.id
    );

    if (currentIndex != selectedIndex) {
      onItemSelected({
        selectedId: selecteditem.id,
        selectionNext: selectedIndex > currentIndex
      });
    }
  };

  render() {
    const { tech, className, listValue, selectedId } = this.props;
    // margin-left: 39px;
    // padding-right: 10px;
    // /* display: none; */
    // /* width: 0px; */
    // max-width: 100px;

    // 27
    // 34
    // 37

    return (
      <Div align="start" className={`${styles.container} ${className}`}>
        {map(listValue, (item, index) => (
          <Spring
            key={item.id}
            to={{
              maxWidth: item.id === selectedId ? 95 : 0,
              opacity: item.id === selectedId ? 1 : 0,
              paddingRight: item.id === selectedId ? 10 : 0,
              marginLeft: tech ? 38 : item.id === selectedId ? item.restMargin : 38,
            }}
          >
            {props => (
              <Fragment>
                {index != 0 && <div className={styles.vertical_divider}></div>}
                <Div
                  row
                  align
                  justify
                  className={`${styles.company_logo_container} ${
                    item.id != selectedId ? styles.onclick_selector : ""
                    }`}
                  onClick={() => this.onClickitemItem(item)}
                >
                  <Div
                    row
                    align
                    justify
                    className={styles.first_logo_container}
                  >
                    <img className={styles.logo} src={item.firstLogo} />
                  </Div>
                  {tech ? (
                    <div
                      style={{
                        opacity: props.opacity,
                        marginLeft: props.marginLeft,
                        maxWidth: props.maxWidth,
                        paddingRight: props.paddingRight,
                      }}
                      className={styles.title}
                    >
                      {item.name}
                    </div>
                  ) : (
                      <img
                        style={{
                          opacity: props.opacity,
                          marginLeft: props.marginLeft,
                          maxWidth: props.maxWidth,
                          paddingRight: props.paddingRight
                        }}
                        className={styles.logo}
                        src={item.restLogo}
                      />
                    )}
                </Div>
              </Fragment>
            )}
          </Spring>
        ))}
      </Div>
    );
  }
}

TimelineSelector.defaultProps = {
  className: ''
}

export default TimelineSelector;
