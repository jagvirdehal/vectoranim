import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GroupProps, MeshProps, Vector3 } from '@react-three/fiber';
import { Matrix3 } from 'three';
import { animated } from '@react-spring/three';

const VECTOR_ROUNDNESS = 32;
const Z_UP = true;

export interface VectorProps extends GroupProps {
    target: Vector3,
    name?: string,
    size?: number,
    color?: string | number | THREE.Color,
    showComponents?: boolean,
}

function getRotation(pos: THREE.Vector3): [xRot: number, yRot: number, zRot: number] {
    let yrot, zrot;

    // Old angles implementation
    // yrot = Math.acos(pos.x / Math.sqrt(pos.x ** 2 + pos.z ** 2));
    // if (pos.z < 0) {
    //     yrot *= -1;
    // }
    // zrot = Math.acos(pos.y / Math.sqrt(pos.x ** 2 + pos.y ** 2 + pos.z ** 2));

    // Projection onto the XZ plane
    let posXZ = pos.clone();
    posXZ.projectOnPlane(new THREE.Vector3(0, 1, 0));
    
    yrot = posXZ.angleTo(new THREE.Vector3(1, 0, 0));
    zrot = pos.angleTo(new THREE.Vector3(0, 1, 0));

    yrot = yrot ? -yrot : 0;
    zrot = zrot ? -zrot : 0;

    return [0, yrot, zrot];
}

function targetToThree(target: Vector3) : THREE.Vector3 {
    let out: THREE.Vector3 = new THREE.Vector3();

    // Convert to THREE.Vector3
    if (typeof target === "number") {
        out = new THREE.Vector3(target, target, target);
    } else if (!(target instanceof THREE.Vector3)) {
        let [x, y, z] = target as number[];
        out = new THREE.Vector3(x, y, z);
    } else {
        out = target.clone();
    }

    // Flip around values if Z_UP
    if (Z_UP) {
        out.applyMatrix3(new Matrix3().set(
            0, 1, 0,
            0, 0, 1,
            1, 0, 0
        ));
    }

    return out;
}

function getRawTarget(target: THREE.Vector3) : THREE.Vector3 {
    let out : THREE.Vector3 = target.clone();
    if (Z_UP) {
        out.applyMatrix3(new Matrix3().set(
            0, 0, 1,
            1, 0, 0,
            0, 1, 0
        ));
    }
    return out;
}

export default function Vector(props: VectorProps) {
    // Default values and preprocessing
    let tempTarget = targetToThree(props.target);
    let position = targetToThree(props.position ? props.position : [0, 0, 0]);
    const [target, setTarget] = useState(tempTarget);
    const [size, setSize] = useState(props.size ? props.size : 0.15);

    // Mesh and material refs
    const meshHead = useRef();
    const meshBody = useRef();
    const material = <meshStandardMaterial color={props.color} />

    // Rotation and length values
    const [rotation, setRotation] = useState(getRotation(target));
    const [length, setLength] = useState(target.length());

    // Updating rotation and length values when target changes
    useEffect(() => {
        let target = targetToThree(props.target);
        setTarget(target);
        setRotation(getRotation(target));
        setLength(target.length());
    }, [props.target]);

    // Rendering component vectors
    let [rawx, rawy, rawz] = getRawTarget(target).toArray();
    let children = [
        rawx !== 0 ? <Vector color="#f66" target={[rawx, 0, 0]} /> : null,
        rawy !== 0 ? <Vector color="#6f6" target={[0, rawy, 0]} position={[rawx, 0, 0]} /> : null,
        rawz !== 0 ? <Vector color="#66f" target={[0, 0, rawz]} position={[rawx, rawy, 0]} /> : null,
    ]

    return (
        <group {...props as GroupProps} position={position}>
            <group rotation={rotation}>
                <mesh
                    ref={meshHead}
                    position={[0, length - size, 0]}
                >
                    <coneBufferGeometry args={[size, 2 * size, VECTOR_ROUNDNESS]} />
                    {material}
                </mesh>
                <mesh
                    ref={meshBody}
                    position={[0, length / 2 - size, 0]}
                >
                    <cylinderBufferGeometry
                        args={[size / 2, size / 2, length - 2 * size, VECTOR_ROUNDNESS]} />
                    {material}
                </mesh>
                {/* <Plane direction={[target.x, target.y, target.z]} /> */}
            </group>
            {props.showComponents ? children : null}
        </group>
    );
}

export const AnimatedVector = animated(Vector);
