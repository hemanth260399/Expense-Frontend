export const Loader = () => {
    return (
        <div style={{
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: -100,
            left: -25,
            width: "100%",
            height: "100%",
            color: "red"
        }}>
            <div className="spinner-grow text-success" role="status">
                <span className="sr-only"> </span>
            </div>
            <div className="spinner-grow text-success" role="status">
                <span className="sr-only"></span>
            </div>
            <div className="spinner-grow text-success" role="status">
                <span className="sr-only"> </span>
            </div>
        </div>
    )
}