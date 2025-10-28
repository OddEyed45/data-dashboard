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
        console.log(response.data.by_type)
        let max = -1;
        for (let i = 0; i < Object.keys(response.data.by_type).length; i++) {
          if (Object.values(response.data.by_type).at(i) > max) {
            max = Object.values(response.data.by_type).at(i)
            setMostCommonSanDiego(Object.keys(response.data.by_type).at(i));
          }
        }
      })
  }, [])

  return (
    <>
      <div className="full-page">
        <LeftSide />
        <BreweryDisplay numBreweries={numBreweries} regionWithMost={regionWithMost}
          mostCommonSanDiego={mostCommonSanDiego} />
      </div>
    </>
  )
}

export default App
