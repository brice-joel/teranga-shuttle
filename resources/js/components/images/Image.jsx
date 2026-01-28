import React from "react";

const Image = ({ src, className }) => {
    return src ? (
        <img src={src} alt="" />
    ) : (
        <img
            src="https://via.placeholder.com/150"
            alt="image non disponible"
            className={className}
        />
    );
};

export default Image;
