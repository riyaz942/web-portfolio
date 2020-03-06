import React, { Component, Fragment } from "react";
import Div from "Common/components/div";
import styles from "./timeline_selector.module.scss";
import map from "lodash/map";
import { Spring } from "react-spring/renderprops";

class itemSelector extends Component {
  constructor(props) {
    super(props)

    this.state = {
      listValue: map(props.listValue, (item, index) => ({...item, isSelected: index == 0? true: false}))
    }
  }

  onClickitemItem = selecteditem => {
    const { onItemSelected } = this.props;
    const { listValue } = this.state;
    
    const currentIndex = listValue.findIndex(item => item.isSelected );
    const selectedIndex = listValue.findIndex(item => item.id == selecteditem.id);

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
  };

  getItemWidth = (tech, item) => {
    let itemWidth = 'unset';

    if (!tech) {
      itemWidth = item.isSelected ? item.containerWidth : 38;
    }

    return itemWidth;
  }

  render() {
    const { listValue } = this.state;
    const { tech } = this.props;
    
    return (
      <Div>
        {map(listValue, (item, index) => (
          <Spring
            key={item.id}
            to={{
              width: this.getItemWidth(tech, item),
              opacity: item.isSelected ? 1 : 0
            }}
          >
            {props => (
              <Fragment>
                {index != 0 && <div className={styles.vertical_divider}></div>}
                <Div
                  row
                  align
                  justify
                  style={{ width: props.width }}
                  className={`${styles.company_logo_container} ${!item.isSelected ? styles.onclick_selector : ''}`}
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
                  {
                    tech ? (
                      <div>{item.name}</div>
                    ) : (
                      <img
                    style={{
                      opacity: props.opacity,
                      marginLeft: item.restMargin
                    }}
                    className={styles.logo}
                    src={item.restLogo}
                  />
                    )
                  }
                </Div>
              </Fragment>
            )}
          </Spring>
        ))}
      </Div>
    );
  }
}

export default itemSelector;
