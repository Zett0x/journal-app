import React from "react";
import { TailSpin } from "react-loader-spinner";
export const LoadingScreen = () => {
  return (
    <div className="loading__main">
      <TailSpin color="#00BFFF" height={80} width={80} />
    </div>
  );
};
