import { useEffect, useState } from "react";
import * as React from "react";
import useInterval from "use-interval";
const zoom = 15;
const areaWidth = 80;
const areaHeight = 60;

export default function Home() {
  const [body, setbody] = useState([
    { top: 29, left: 10 },
    { top: 29, left: 9 },
    { top: 29, left: 8 },
  ]);
  const [body2, setbody2] = useState([
    { top: 29, left: 73 },
    { top: 29, left: 74 },
    { top: 29, left: 75 },
  ]);
  const [direction, setDirection] = useState("right");
  const [direction2, setDirection2] = useState("left");
  useEffect((e) => {
    window.addEventListener(`keydown`, (e) => {
      setDirection((prevDirection) => {
        switch (e.code) {
          case "KeyA":
            if (prevDirection !== `right`) {
              return "left";
            }
            break;
          case "KeyD":
            if (prevDirection !== `left`) {
              return "right";
            }
            break;
          case "KeyW":
            if (prevDirection !== `down`) {
              return `up`;
            }
            break;
          case "KeyS":
            if (prevDirection !== `up`) {
              return `down`;
            }
            break;
        }
        return prevDirection;
      });
      setDirection2((prevDirection2) => {
        switch (e.code) {
          case "ArrowLeft":
            if (prevDirection2 !== `right`) {
              return "left";
            }
            break;
          case "ArrowRight":
            if (prevDirection2 !== `left`) {
              return "right";
            }
            break;
          case "ArrowUp":
            if (prevDirection2 !== `down`) {
              return `up`;
            }
            break;
          case "ArrowDown":
            if (prevDirection2 !== `up`) {
              return `down`;
            }
            break;
        }
        return prevDirection2;
      });
    });
  }, []);

  function goRight() {
    let newLeft = body[0].left + 1;
    if (newLeft > areaWidth - 1) {
      newLeft = 0;
    }
    return { ...body[0], left: newLeft };
  }

  function goDown() {
    let newTop = body[0].top + 1;
    if (newTop > areaHeight - 1) {
      newTop = 0;
    }
    return { ...body[0], top: newTop };
  }

  function goLeft() {
    let newRight = body[0].left - 1;
    if (newRight < 0) {
      newRight = areaWidth - 1;
    }
    return { ...body[0], left: newRight };
  }
  function goUp() {
    let newBottom = body[0].top - 1;
    if (newBottom < 0) {
      newBottom = areaHeight - 1;
    }

    return { ...body[0], top: newBottom };
  }
  function goRight2() {
    let newLeft = body2[0].left + 1;
    if (newLeft > areaWidth - 1) {
      newLeft = 0;
    }
    return { ...body2[0], left: newLeft };
  }

  function goDown2() {
    let newTop = body2[0].top + 1;
    if (newTop > areaHeight - 1) {
      newTop = 0;
    }
    return { ...body2[0], top: newTop };
  }

  function goLeft2() {
    let newRight = body2[0].left - 1;
    if (newRight < 0) {
      newRight = areaWidth - 1;
    }
    return { ...body2[0], left: newRight };
  }
  function goUp2() {
    let newBottom = body2[0].top - 1;
    if (newBottom < 0) {
      newBottom = areaHeight - 1;
    }

    return { ...body2[0], top: newBottom };
  }
  useInterval(() => {
    const newbody = [...body];
    const newbody2 = [...body2];
    let newHead = null;
    let newHead2 = null;
    switch (direction) {
      case "right":
        newHead = goRight();
        break;
      case "down":
        newHead = goDown();
        break;
      case "left":
        newHead = goLeft();
        break;
      case "up":
        newHead = goUp();
        break;
      default:
        newHead = goRight();
    }
    switch (direction2) {
      case "right":
        newHead2 = goRight2();
        break;
      case "down":
        newHead2 = goDown2();
        break;
      case "left":
        newHead2 = goLeft2();
        break;
      case "up":
        newHead2 = goUp2();
        break;
      default:
        newHead2 = goRight2();
    }

    const deletePlayerOne = [...body];
    const deletePlayerTwo = [...body2];
    deletePlayerOne.shift();
    deletePlayerTwo.shift();
    if (
      deletePlayerTwo.find(
        (e) => e.top === body[0].top && e.left === body[0].left
      )
    ) {
      // alert("Player 2 win");
      location.reload();
    } else if (
      deletePlayerOne.find(
        (e) => e.top === body2[0].top && e.left === body2[0].left
      )
    ) {
      // alert("Player 1 win");
      location.reload();
    } else if (
      deletePlayerOne.find(
        (e) => e.top === body[0].top && e.left === body[0].left
      )
    ) {
      // alert("Player 2 win");
      location.reload();
    } else if (
      deletePlayerTwo.find(
        (e) => e.top === body2[0].top && e.left === body2[0].left
      )
    ) {
      // alert("Player 1 win");
      location.reload();
    }

    newbody.unshift(newHead);
    setbody(newbody);
    newbody2.unshift(newHead2);
    setbody2(newbody2);
  }, 100);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div
        className="relative bg-slate-300"
        style={{ width: areaWidth * zoom, height: areaHeight * zoom }}
      >
        {" "}
        {body.map((segment) => (
          <div
            className="absolute rounded bg-blue-900"
            style={{
              top: segment.top * zoom,
              left: segment.left * zoom,
              width: zoom,
              height: zoom,
            }}
          ></div>
        ))}
        {body2.map((segment) => (
          <div
            className="absolute rounded bg-pink-900"
            style={{
              top: segment.top * zoom,
              left: segment.left * zoom,
              width: zoom,
              height: zoom,
            }}
          ></div>
        ))}
      </div>
    </main>
  );
}
