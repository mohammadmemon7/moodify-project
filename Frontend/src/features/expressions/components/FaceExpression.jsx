import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import "../styles/FaceExpression.scss";

export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Detecting...");

    useEffect(() => {
        init({ landmarkerRef, videoRef, streamRef });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
        const expression = await detect({ landmarkerRef, videoRef, setExpression });
        if (expression) {
            onClick(expression)
        }
    }

    return (
        <div className="detector-card">
            <div className="webcam-frame">
                <video
                    ref={videoRef}
                    playsInline
                />
                <div className="corner tl"></div>
                <div className="corner tr"></div>
                <div className="corner bl"></div>
                <div className="corner br"></div>
                <div className="scan-line"></div>
            </div>

            <div className="detector-footer">
                <div className="mood-label-display">
                    <span className="label">DETECTED MOOD</span>
                    <span className="expression-text">{expression}</span>
                </div>
                <button onClick={handleClick} className="detect-btn">
                    Scan Mood
                </button>
            </div>
        </div>
    );
}
