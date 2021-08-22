import { OrbitControls } from '@react-three/drei';

export default function Camera() {
    return(
        <>
            <OrbitControls autoRotate target={[0, 0, 0]} />
        </>
    )
}