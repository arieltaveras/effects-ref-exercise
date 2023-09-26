import React, {useState} from "react";
import "./DrawCard.css"

const DrawCard = ({name, image}) => {
    const [{angle, xPos, yPos}] = useState({
        angle: Math.random() * 90 - 45,
        xPos: Math.random() * 40 - 20,
        yPos: Math.random() * 40 - 20,
    });

    const change = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;

    return <img 
        className="DrawCard"
        alt={name}
        src={image}
        style={{change}} />
}

export default DrawCard