import React, { Component } from "react";
import throttle from "lodash/throttle";

const responsiveBreakpointHoc = WrappedComponent => {
  class responsiveBreakpoint extends Component {
    constructor(props) {
      super(props);
      this.state = {
        screenSize: this.getDeviceConfig(window.innerWidth)
      }
    }

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

    calcInnerWidth = () => {
      const screenSize = this.getDeviceConfig(window.innerWidth);
      this.setState({ screenSize });
    };

    componentDidMount() {
      window.addEventListener("resize", throttle(this.calcInnerWidth, 200));
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.calcInnerWidth);
    }

    render() {
      const { screenSize } = this.state;

      return (
        <WrappedComponent
          screenSize={screenSize}
          {...this.props}
        />
      );
    }
  }

  return responsiveBreakpoint;
};

export default responsiveBreakpointHoc;
