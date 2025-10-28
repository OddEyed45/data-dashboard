const BreweryDisplay = (props) => {
    return (<>
        <div className="content">
            <div className="stats">
                <h2 className="stat">Total number of breweries in the dataset: {props.numBreweries}</h2>
                <h2 className="stat">The region with the most breweries: {props.regionWithMost}</h2>
                <h2 className="stat">The most common type of brewery in San Diego, California: {props.mostCommonSanDiego.toUpperCase()}</h2>

            </div>
            <div className="search">
                <input></input>
            </div>
        </div>
    </>)
}

export default BreweryDisplay