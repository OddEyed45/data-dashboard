const BreweryDisplay = (props) => {
    const breweries = Array.isArray(props.breweries) ? props.breweries : []

    return (
        <>
            <div className="content">
                <div className="stats">
                    <h2 className="stat">Total number of breweries in the dataset: {props.numBreweries}</h2>
                    <h2 className="stat">The region with the most breweries: {props.regionWithMost}</h2>
                    <h2 className="stat">The most common type of brewery in San Diego, California: {props.mostCommonSanDiego}</h2>
                </div>

                <div className="search">
                    <div className="search-contents">
                        <div className="top-bit">
                            <input className="search-input" name="name" onChange={props.handleBreweryName} placeholder="Enter brewery name here" />
                            <input className="search-input" name="city" onChange={props.handleCity} placeholder="Enter city here" />
                        </div>

                        <div className="bottom-bit">
                            {breweries.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">City</th>
                                            <th scope="col">Country</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {breweries.map((brewery, idx) => (
                                            <tr key={brewery.id ?? brewery.name ?? idx}>
                                                <td>{brewery.id}</td>
                                                <td>{brewery.name}</td>
                                                <td>{brewery.city}</td>
                                                <td>{brewery.country}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div>No breweries to display.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BreweryDisplay