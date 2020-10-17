import React, { useState } from "react";
import Div from "Common/components/div";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import DescriptionPage from "./descriptionPage";
import ListingPage from "./listingPage";

const AbsoluteDiv = ({ children, style }) => (
  <Div
    style={{
      ...style,
      height: "100%",
      width: "100%",
      left: 0,
      top: 0,
      position: "absolute"
    }}
  >
    {children}
  </Div>
);

const PageTransitionExample = ({ history: { push } }) => {
  const [selectedItemDetails, setSelectedItemDetails] = useState({});
  const [containerPosition, setContainerPosition] = useState({});
  const [imagePosition, setImagePosition] = useState({});

  const onItemSelected = (event, item) => {
    const containerTarget = event.currentTarget;
    const imageTarget = event.currentTarget.firstElementChild;

    const containerDimensions = containerTarget.getBoundingClientRect();
    const imageDimensions = imageTarget.getBoundingClientRect();

    //DOMRect object not iterable, so can't destructure
    setContainerPosition({
      width: containerDimensions.width,
      height: containerDimensions.height,
      top: containerDimensions.top,
      left: containerDimensions.left
    });

    setImagePosition({
      width: imageDimensions.width,
      height: imageDimensions.height,
      top: imageDimensions.top,
      left: imageDimensions.left
    });
    setSelectedItemDetails(item)
    push("pagetransition/description");
  };

  return (
    <Div
      fillParent
      style={{ height: "100%", width: "100%", position: "relative" }}
    >
      <Route path="/example/pagetransition">
        <AbsoluteDiv style={{zIndex: 0}}>
          <ListingPage onItemSelected={onItemSelected} />
        </AbsoluteDiv>
      </Route>
      <Route exact path="/example/pagetransition/description">
        <AbsoluteDiv style={{zIndex: 1}}>
          <DescriptionPage
            itemPosition={{
              containerPosition,
              imagePosition
            }}
            selectedItemDetails={selectedItemDetails}
          />
        </AbsoluteDiv>
      </Route>
    </Div>
  );
};

export default withRouter(PageTransitionExample);
