const GRID_SIZE = 8;
const Z_UP = true;

export default function Grid() {
    return (
        <>
            <axesHelper scale={3} rotation={Z_UP ? [3 * Math.PI / 2, 0, 3 * Math.PI / 2] : [0,0,0]}/>
            <gridHelper args={[GRID_SIZE * 2, GRID_SIZE * 2]} />
        </>
    )
}