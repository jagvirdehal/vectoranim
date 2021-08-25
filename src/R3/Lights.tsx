export default function Lights() {
    return (
        <>
            <ambientLight intensity={0.1} />
            <directionalLight position={[2, 3, 5]} />
            <directionalLight position={[-2, -3, -5]} />
        </>
    )
}
