import { Link } from "@mui/material";
import not_found from "../assets/images/page-not-found.png";

const Error = () => {
    return (
        <div className="mt-5 flex flex-col items-center justify-center">
            <div>
                <img src={not_found} alt="404 introuvable" />
            </div>
            <h1 className="text-red-700">
                <Link
                    href="/"
                    className="mt-2 px-2 py-1  rounded-lg shadow-md text-xl transition-colors"
                >
                    Retourner à l'accueil
                </Link>
            </h1>
        </div>
    );
};

export default Error;
