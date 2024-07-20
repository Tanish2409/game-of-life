import { useEffect, useState } from "react";
import LifeBoardController from "./LifeBoardController";

const LifeBoard = () => {
  const [lifeBoard, setLifeBoard] = useState<number[][]>(
    new Array(30).fill(new Array(30).fill(0))
  );

  const [currentLifeState, setCurrentLifeState] = useState<number[][]>([]);
  const [gameInProgress, setGameInProgress] = useState<boolean>(false);

  const setRandomInitialState = () => {
    // Logic to set random inital start state
  };

  const setLifeBoardInitialState = (rowIdx: number, colIdx: number) => {
    // Cannot set state in between of process
    if (gameInProgress) return;

    // Deep Clone current LifeBoard state
    const clonedLifeBoard = JSON.parse(JSON.stringify(lifeBoard));
    clonedLifeBoard[rowIdx][colIdx] =
      clonedLifeBoard[rowIdx][colIdx] === 0 ? 1 : 0;
    setCurrentLifeState([...currentLifeState, [rowIdx, colIdx]]);
    setLifeBoard(clonedLifeBoard);
  };

  const activateGameplay = () => {
    setGameInProgress(true);
    calculateNextLifeBoardState();
  };

  const terminateGameplay = () => {
    setGameInProgress(false);
  };

  // Function to calculate next game of life state
  const calculateNextLifeBoardState = () => {
    if (!currentLifeState.length) {
      terminateGameplay();
      return;
    };

    let distinctCells = new Set();

    currentLifeState.map((state, key) => {
      const allNeighbors = getAllNeighbors(state[0], state[1]);
      distinctCells.add(JSON.stringify(state));
      allNeighbors.forEach((neighborIdx) =>
        distinctCells.add(JSON.stringify(neighborIdx))
      );
    });
    checkDistinctCellsLife(distinctCells);
  };

  // Function to update all cells life based on their neighbors population
  const checkDistinctCellsLife = (cells) => {
    const clonedLifeBoard = JSON.parse(JSON.stringify(lifeBoard));
    const newCurrentLifeState = [];

    cells.forEach((cell) => {
      const cellIndexes = JSON.parse(cell);
      const cellNeighbors = getAllNeighbors(cellIndexes[0], cellIndexes[1]);
      const areaPopulation = cellNeighbors.reduce((acc, cell) => {
        return acc + lifeBoard[cell[0]][cell[1]];
      }, 0);

      if ((areaPopulation === 2 || areaPopulation === 3) && lifeBoard[cellIndexes[0]][cellIndexes[1]] === 1) {
        newCurrentLifeState.push([cellIndexes[0], cellIndexes[1]]);
        clonedLifeBoard[cellIndexes[0]][cellIndexes[1]] = 1;
      } else if (areaPopulation === 3 && lifeBoard[cellIndexes[0]][cellIndexes[1]] === 0) {
        newCurrentLifeState.push([cellIndexes[0], cellIndexes[1]]);
        clonedLifeBoard[cellIndexes[0]][cellIndexes[1]] = 1;
      } else {
        clonedLifeBoard[cellIndexes[0]][cellIndexes[1]] = 0;
      }
    });

    setCurrentLifeState(newCurrentLifeState);
    setLifeBoard(clonedLifeBoard);
  };

  // Function to get all neighbor cell indees for particular cell
  const getAllNeighbors = (rowIdx: number, colIdx: number) => {
    const neighbors = [
      [rowIdx - 1, colIdx - 1],
      [rowIdx - 1, colIdx],
      [rowIdx - 1, colIdx + 1],
      [rowIdx, colIdx - 1],
      [rowIdx, colIdx + 1],
      [rowIdx + 1, colIdx - 1],
      [rowIdx + 1, colIdx],
      [rowIdx + 1, colIdx + 1],
    ];

    // Filter out neighbors that are out of bounds
    return neighbors.filter(([r, c]) => r >= 0 && r < 30 && c >= 0 && c < 30);
  };

  useEffect(() => {
    if (gameInProgress) {
      setTimeout(() => {
        calculateNextLifeBoardState();
      }, 500);
    }
  }, [gameInProgress, lifeBoard]);

  return (
    <>
      <main className="bg-[#30303A] w-full p-[50px] pb-24">
        <div className="flex flex-col items-center justify-center">
          {lifeBoard &&
            lifeBoard.map((lifeRow: number[], rowIdx: number) => {
              return (
                <div key={rowIdx} className="flex flex-row items-center">
                  {lifeRow.map((life: number, colIdx: number) => {
                    return (
                      <div
                        key={colIdx}
                        onClick={() => setLifeBoardInitialState(rowIdx, colIdx)}
                        className={`w-[20px] h-[20px] border-[1px] border-[#bbbbbb] cursor-pointer
                          ${life === 1 ? "bg-[#B3679B]" : "bg-[#d8d5db]"}`}
                      ></div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </main>

      <footer>
        <LifeBoardController
          activateGameplay={activateGameplay}
          terminateGameplay={terminateGameplay}
          setRandomInitialState={setRandomInitialState}
          gameInProgress={gameInProgress}
        />
      </footer>
    </>
  );
};

export default LifeBoard;
