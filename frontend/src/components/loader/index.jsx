import React from "react";
import {
  ErrorPageWrapper,
  FullScreenLoaders,
  NoDataWrapper,
  RightPageLoaderWrapper,
} from "./styles";
import { ThreeDots, Triangle } from "react-loader-spinner";

export const FullScreenLoader = () => {
  return (
    <FullScreenLoaders>
      <img className="image" src="/images/cat.gif" alt="animation"></img>
    </FullScreenLoaders>
  );
};

export const RightPageLoader = () => {
  return (
    <RightPageLoaderWrapper>
      <Triangle
        height="120"
        width="120"
        color="var(--primary-color)"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </RightPageLoaderWrapper>
  );
};

export const ButtonLoader = () => {
  return (
    <ThreeDots
      height="20"
      width="30"
      radius="5"
      color="#fff"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
};

export const Nodata = () => {
  return (
    <NoDataWrapper>
      <img src="/images/noData.gif" alt="No Data"></img>
    </NoDataWrapper>
  );
};

export const ErrorPage = ({ text }) => {
  return (
    <ErrorPageWrapper>
      <img alt="error" src="/images/errorPage.gif"></img>
      <div className="text">{text}</div>
    </ErrorPageWrapper>
  );
};
