import { useSpring, animated } from '@react-spring/three';
import { Vector3 } from '@react-three/fiber';
import { useState } from 'react';
import * as THREE from 'three';
import Vector from './Vector';

function Box() {
    const [active, setActive] = useState(false);
    const { scale } = useSpring({
        scale: active ? 2 : 1,
    });

    return (
        <animated.mesh
            scale={scale}
            onClick={() => setActive(!active)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial />
        </animated.mesh>
    )
}

const AnimatedVector = animated(Vector);

export default function Scene() {
    const [active, setActive] = useState(false);
    const props = useSpring({
        target: active ? [0.5, 2, 1] : [1, 1, 1],
    });

    return(
        <>
            {/* <Box /> */}
            <AnimatedVector
                onClick={() => setActive(!active)}
                target={props.target as any}
                showComponents />
        </>
    )
}
