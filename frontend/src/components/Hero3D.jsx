import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial color="#888888" metalness={0.6} roughness={0.2} />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginBottom: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "50vh",
        }}
      >
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} />
          <Sphere />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </div>
  );
}
