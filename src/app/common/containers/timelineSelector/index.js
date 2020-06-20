import React, { Component, Fragment } from "react";
import Div from "Common/components/div";
import styles from "./timeline_selector.module.scss";
import map from "lodash/map";
import { Spring } from "react-spring/renderprops";

class TimelineSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listValue: map(props.listValue, (item, index) => ({
        ...item,
        isSelected: index == 0 ? true : false
      }))
    };
  }

  onClickitemItem = selecteditem => {
    const { onItemSelected } = this.props;
    const { listValue } = this.state;

    const currentIndex = listValue.findIndex(item => item.isSelected);
    const selectedIndex = listValue.findIndex(
      item => item.id == selecteditem.id
    );

    if (currentIndex != selectedIndex) {
      const updatedlistValue = map(listValue, item => {
        if (selecteditem.id == item.id)
          return {
            ...item,
            isSelected: true
          };
        return {
          ...item,
          isSelected: false
        };
      });

      onItemSelected({
        selectedId: selecteditem.id,
        selectionNext: selectedIndex > currentIndex
      });
      this.setState({ listValue: updatedlistValue });
    }
  };

  render() {
    const { listValue } = this.state;
    const { tech } = this.props;
    // margin-left: 39px;
    // padding-right: 10px;
    // /* display: none; */
    // /* width: 0px; */
    // max-width: 100px;

    // 27
    // 34
    // 37

    return (
      <Div align="start" className={styles.container}>
        {map(listValue, (item, index) => (
          <Spring
            key={item.id}
            to={{
              maxWidth: item.isSelected ? 95 : 0,
              opacity: item.isSelected ? 1 : 0,
              paddingRight: item.isSelected ? 10 : 0,
              marginLeft: tech ? 38 : item.isSelected ? item.restMargin : 38,
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
                    !item.isSelected ? styles.onclick_selector : ""
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

export default TimelineSelector;
