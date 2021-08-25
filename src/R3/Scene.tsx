import { useSpring } from '@react-spring/three';
import { useState } from 'react';
import { AnimatedVector } from './Vector';

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
