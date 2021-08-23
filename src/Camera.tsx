import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

export default function Camera() {
    return(
        <>
            <PerspectiveCamera
                makeDefault
                position={[2.5, 2, 6]}
                />
            <OrbitControls
                autoRotate
                enablePan={false}
                target={[0, 0, 0]} />
        </>
    )
}
