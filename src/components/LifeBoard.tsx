import React, { useState } from "react";
import LifeBoardController from "./LifeBoardController";

const LifeBoard = () => {
  const [lifeBoard, setLifeBoard] = useState(
    new Array(30).fill(new Array(30).fill(0))
  );

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
                        // onClick={() => setLifeBoardInitialState(rowIdx, colIdx)}
                        className={`w-[30px] h-[30px] bg-[#d8d5db] border-[1px] border-[#bbbbbb] cursor-pointer 
                          ${ life === 1 ? "bg-[#B3679B]" : "bg-[#d8d5db]"}`
                        }
                      ></div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </main>

      <footer>
        <LifeBoardController/>
      </footer>
    </>
  );
};

export default LifeBoard;
