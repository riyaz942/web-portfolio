import React, { Component } from "react";
import { withRouter } from "react-router";
import throttle from "lodash/throttle";

const navigatorHoc = WrappedComponent => {
  class navigator extends Component {
    state = {
      screenSize: ""
    };

    getDeviceConfig = width => {
      if (width <= 450) {
        return "sm";
      } else if (width > 450 && width <= 650) {
        return "md";
      } else if (width > 650 && width <= 1024) {
        return "lg";
      }

      return "xlg";
    };

    calcInnerWidth = throttle(function() {
      const screenSize = getDeviceConfig(window.innerWidth);
      this.setState({ screenSize });
    }, 200);

    componentDidMount() {
      window.addEventListener("resize", this.calcInnerWidth);
      const screenSize = getDeviceConfig(window.innerWidth);
      this.setState({ screenSize });
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.calcInnerWidth);
    }

    render() {
      return (
        <WrappedComponent
          navigateTo={this.navigateTo}
          replaceTo={this.replaceTo}
          pop={this.pop}
          {...this.props}
        />
      );
    }
  }

  return withRouter(navigator);
};

export default navigatorHoc;
