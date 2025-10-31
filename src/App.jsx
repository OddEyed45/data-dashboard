import { useEffect, useState } from "react"
import axios from 'axios';
import BreweryDisplay from "./components/BreweryDisplay"

const LeftSide = () => {
  return (<>
    <div className="leftside">
      <h1>Brewery Stop</h1>
      <button className="dashboard-button">🏠 Dashboard</button>
    </div>
  </>)
}

const App = () => {
  const [numBreweries, setNumBreweries] = useState(0)
  const [regionWithMost, setRegionWithMost] = useState("")
  const [mostCommonSanDiego, setMostCommonSanDiego] = useState(0)
  const [breweries, setBreweries] = useState([]);
  const [city, setCity] = useState("")
  const [breweryName, setBreweryName] = useState("")

  const handleBreweryName = (e) => {
    setBreweryName(e.target.value);
  }

  const handleCity = (e) => {
    setCity(e.target.value)
  }


  useEffect(() => {
    axios.get("https://api.openbrewerydb.org/v1/breweries/meta")
      .then(response => {
        setNumBreweries(response.data.total)

        let max = -1;
        for (let i = 0; i < Object.keys(response.data.by_state).length; i++) {
          if (Object.values(response.data.by_state).at(i) > max) {
            max = Object.values(response.data.by_state).at(i)
            setRegionWithMost(Object.keys(response.data.by_state).at(i));
          }
        }
      })

    axios.get("https://api.openbrewerydb.org/v1/breweries/meta?by_city=san_diego")
      .then(response => {
        let max = -1;
        for (let i = 0; i < Object.keys(response.data.by_type).length; i++) {
          if (Object.values(response.data.by_type).at(i) > max) {
            max = Object.values(response.data.by_type).at(i)
            setMostCommonSanDiego(Object.keys(response.data.by_type).at(i));
          }
        }
      })

    axios.get("https://api.openbrewerydb.org/v1/breweries?per_page=12")
      .then(response => {
        const breweriesFromResponse = response.data.map(brew => ({
          id: brew.id,
          name: brew.name,
          city: brew.city,
          country: brew.country
        }));

        setBreweries(breweriesFromResponse);
      })
  }, [])

  useEffect(() => {
    const getBreweries = async () => {
      await axios.get(("https://api.openbrewerydb.org/v1/breweries?per_page=12" +
        (breweryName.length > 0 ? `&by_name=${breweryName.replace(" ", "_").toLocaleLowerCase()}` : "")
        + (city.length > 0 ? `&by_city=${city.replace(" ", "_").toLocaleLowerCase()}` : "")))
        .then(response => {
          const breweriesFromResponse = response.data.map(brew => ({
            id: brew.id,
            name: brew.name,
            city: brew.city,
            country: brew.country
          }));

          setBreweries(breweriesFromResponse);
        })
    }
    getBreweries()
  }, [breweryName, city])

  return (
    <>
      <div className="full-page">
        <LeftSide />
        <BreweryDisplay numBreweries={numBreweries} regionWithMost={regionWithMost}
          mostCommonSanDiego={mostCommonSanDiego} breweryName={breweryName}
          handleBreweryName={handleBreweryName} city={city} handleCity={handleCity}
          breweries={breweries} />
      </div>
    </>
  )
}

export default App
