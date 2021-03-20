import React from "react";
import CurrencySub from "./CurrencySub";
import OrdersSub from "./OrdersSub";

export const WebappSubscription = () => {
  return (
    <>
      <CurrencySub symbol="STQ" />
      <OrdersSub />
    </>
  );
};

export default WebappSubscription;
