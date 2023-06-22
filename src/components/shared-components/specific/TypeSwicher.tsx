import dvdIcon from "assets/img/fa-icons/compact-disc-solid.svg"
import bookIcon from "assets/img/fa-icons/book-solid.svg"
import furnitureIcon from "assets/img/fa-icons/couch-solid.svg"

type PropsType = {
    id: string,
    label: string,
    activeType: string,
    setActiveType: (type: "dvd" | "book" | "furniture") => void;
}

export default function TypeSwitcher({ id, label, activeType, setActiveType }: PropsType) {

    return (
        <>
            <div className="type-switcher">
                <label htmlFor={id}>{label}</label>
                <div className="buttons">
                    <button
                        className={`btn${activeType == "dvd" ? " active-type" : ""}`}
                        type="button"
                        onClick={() => setActiveType("dvd")}
                    >
                        <span className="icon">
                            <span className="circle">
                                <img src={dvdIcon} alt="" />
                            </span>
                        </span>
                        DVD
                    </button>
                    <button
                        className={`btn${activeType == "book" ? " active-type" : ""}`}
                        type="button"
                        onClick={() => setActiveType("book")}
                    >
                        <span className="icon">
                            <span className="circle">
                                <img src={bookIcon} alt="" />
                            </span>
                        </span>
                        Book
                    </button>
                    <button
                        className={`btn${activeType == "furniture" ? " active-type" : ""}`}
                        type="button"
                        onClick={() => setActiveType("furniture")}
                    >
                        <span className="icon">
                            <span className="circle">
                                <img src={furnitureIcon} alt="" />
                            </span>
                        </span>
                        Furniture
                    </button>
                </div>
            </div>
        </>
    )
}