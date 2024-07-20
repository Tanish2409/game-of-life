import { useEffect, useState } from "react";
import LifeBoardController from "./LifeBoardController";

const LifeBoard = () => {
  const [lifeBoard, setLifeBoard] = useState<number[][]>(
    new Array(30).fill(new Array(30).fill(0))
  );
  const [currentLifeState, setCurrentLifeState] = useState<number[][]>([]);
  const [gameInProgress, setGameInProgress] = useState<boolean>(false);

  // Initializes a 30x30 board with all cells set to 0 (dead)
  const resetLifeBoardState = () => {
    setLifeBoard(new Array(30).fill(0).map(() => new Array(30).fill(0)));
  };

  /**
   * Sets a random initial state for the life board by activating 100 random cells
   */
  const setRandomInitialState = () => {
    resetLifeBoardState();
    const clonedLifeBoard = JSON.parse(JSON.stringify(lifeBoard));

    // Set 100 random cells to be alive
    for (let i = 0; i < 300; i++) {
      const rowIdx = Math.floor(Math.random() * 30);
      const colIdx = Math.floor(Math.random() * 30);

      setCurrentLifeState((prev) => [...prev, [rowIdx, colIdx]]);
      clonedLifeBoard[rowIdx][colIdx] = 1;
    }

    setLifeBoard(clonedLifeBoard);
  };

  /**
   * Sets the initial state of a specific cell
   * @param {number} rowIdx - The row index of the cell
   * @param {number} colIdx - The column index of the cell
   */
  const setLifeBoardInitialState = (rowIdx, colIdx) => {
    // Prevent changes while the game is in progress
    if (gameInProgress) return;

    // Toggle the state of the specified cell
    const clonedLifeBoard = JSON.parse(JSON.stringify(lifeBoard));
    clonedLifeBoard[rowIdx][colIdx] = clonedLifeBoard[rowIdx][colIdx] === 0 ? 1 : 0;

    setCurrentLifeState((prev) => [...prev, [rowIdx, colIdx]]);
    setLifeBoard(clonedLifeBoard);
  };

  // Starts the game
  const activateGameplay = () => {
    setGameInProgress(true);
    calculateNextLifeBoardState();
  };

  // Stops the game
  const terminateGameplay = () => {
    setGameInProgress(false);
  };

  /**
   * Calculates the next state of the life board based on the current state
   */
  const calculateNextLifeBoardState = () => {
    if (!currentLifeState.length) {
      terminateGameplay();
      return;
    }

    let distinctCells = new Set();

    // Collect all cells that need to be checked (current live cells and their neighbors)
    currentLifeState.forEach(([row, col]) => {
      distinctCells.add(JSON.stringify([row, col]));
      getAllNeighbors(row, col).forEach((neighbor) =>
        distinctCells.add(JSON.stringify(neighbor))
      );
    });

    checkDistinctCellsLife(distinctCells);
  };

  /**
   * Updates the life state of all distinct cells based on their neighbors' population
   * @param {Set} cells - A set of cells to be checked
   */
  const checkDistinctCellsLife = (cells) => {
    const clonedLifeBoard = JSON.parse(JSON.stringify(lifeBoard));
    const newCurrentLifeState = [];

    cells.forEach((cell) => {
      const [row, col] = JSON.parse(cell);
      const cellNeighbors = getAllNeighbors(row, col);
      const areaPopulation = cellNeighbors.reduce((acc, [r, c]) => acc + lifeBoard[r][c], 0);

      if ((areaPopulation === 2 || areaPopulation === 3) && lifeBoard[row][col] === 1) {
        newCurrentLifeState.push([row, col]);
        clonedLifeBoard[row][col] = 1;
      } else if (areaPopulation === 3 && lifeBoard[row][col] === 0) {
        newCurrentLifeState.push([row, col]);
        clonedLifeBoard[row][col] = 1;
      } else {
        clonedLifeBoard[row][col] = 0;
      }
    });

    setCurrentLifeState(newCurrentLifeState);
    setLifeBoard(clonedLifeBoard);
  };

  /**
   * Gets all valid neighbor cell indices for a given cell
   * @param {number} rowIdx - The row index of the cell
   * @param {number} colIdx - The column index of the cell
   * @returns {Array} - An array of valid neighbor cell indices
   */
  const getAllNeighbors = (rowIdx, colIdx) => {
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

  // Effect to calculate the next life board state at regular intervals
  useEffect(() => {
    if (gameInProgress) {
      const interval = setTimeout(() => {
        calculateNextLifeBoardState();
      }, 500);

      return () => clearTimeout(interval);
    }
  }, [gameInProgress, lifeBoard]);

  return (
    <>
      <main className="bg-[#30303A] w-full h-full p-[50px] pb-24">
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
          resetLifeBoardState={resetLifeBoardState}
          gameInProgress={gameInProgress}
        />
      </footer>
    </>
  );
};

export default LifeBoard;
