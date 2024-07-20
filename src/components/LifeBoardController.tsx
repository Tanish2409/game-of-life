import React from "react";
import StyledButton from "./global/StyledButton";

type LifeBoardControllerProps = {
  activateGameplay: () => void;
  terminateGameplay: () => void;
  setRandomInitialState: () => void;
  gameInProgress: boolean;
};

const LifeBoardController = ({
  activateGameplay,
  terminateGameplay,
  setRandomInitialState,
  gameInProgress,
}: LifeBoardControllerProps) => {
  return (
    <div className="w-full fixed bottom-0 flex flex-row items-center justify-center gap-8 bg-[#111111bd] py-3">
      {!gameInProgress ? (
        <StyledButton title="Start" action={activateGameplay} />
      ) : (
        <StyledButton title="Stop" action={terminateGameplay} />
      )}
      <StyledButton
        title="Create Random Start State"
        action={setRandomInitialState}
      />
    </div>
  );
};

export default LifeBoardController;
