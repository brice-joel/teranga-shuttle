import TrajetCard from "../components/TrajetCard";
const TrajetsList = ({ trajets }) => {
    return (
        <section className="m-5" id="trajets">
            <h1 className="text-xl text-center">Nos trajets exclusifs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                {trajets.map((trajet) => (
                    <div
                        key={trajet.id}
                        className="bg-color-500  bg-opacity-20 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <TrajetCard trajet={trajet} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrajetsList;
