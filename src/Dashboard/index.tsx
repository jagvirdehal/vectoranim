import React from 'react';
import { rubberbandIfOutOfBounds, useDrag } from '@use-gesture/react';
import { a, useSpring } from '@react-spring/web';

import styles from './dashboard.module.css'

const boxSize = 60;
const catchSize = 15;

export default function App() {
    const boxes: Array<[number, number]> = [
        [0, 0],
        [-200, 0],
        [200, 0],
    ];
    const whichBox = (x: number, y: number) => {
        let minDistance = Infinity;
        let minBox : any[] = [null, null];
        boxes.forEach(box => {
            let [bx, by] = box;
            let distance = (x - bx)**2 + (y - by)**2;
            let insideBox = (Math.abs(x - bx) < boxSize + catchSize) &&
                            (Math.abs(y - by) < boxSize + catchSize);
            if (insideBox && distance < minDistance) {
                minDistance = distance;
                minBox = [bx, by];
            }
        });

        return minBox;
    }

    const [style, api] = useSpring(() => ({ x: 0, y: 0, scale: 1}));
    const bind = useDrag(
        ({ active, movement: [x, y], offset: [ox, oy] }) => {
            let box = whichBox(ox, oy);
            let [bx, by] = box;
            let insideBox = bx !== null && by !== null;
            let newX = rubberbandIfOutOfBounds(ox, bx - boxSize / 2, bx + boxSize / 2, 0.15);
            let newY = rubberbandIfOutOfBounds(oy, by - boxSize / 2, by + boxSize / 2, 0.15);
            console.log(box);
            
            api.start({
                x: insideBox ? (active ? newX : bx) : (active ? ox : ox),
                y: insideBox ? (active ? newY : by) : (active ? oy : oy),
                scale: active ? 1.2 : 1,
                config: {
                    mass: insideBox ? 1.5 : 0.1,
                    tension: insideBox ? 370 : 270,
                    friction: insideBox ? 28 : 18,
                    clamp: !insideBox,
                },
            })
        },
        { from: () => [style.x.get(), style.y.get()] }
    )

    return (
        <div className={styles.dashboard} >
            {boxes.map(([x, y]) => {
                return (
                    <div
                        style={{
                            position: 'absolute',
                            height: `${boxSize}px`,
                            width: `${boxSize}px`,
                            border: '5px solid red',
                            padding: '5px',
                            transform: `translate3d(${x}px, ${y}px, 0px)`,
                        }} />
                );
            })}
            <a.div tabIndex={-1} {...bind()} className={styles.drag} style={{ ...style, height: `${boxSize}px`, width: `${boxSize}px` }} />
        </div>
    )
}
