import React, { useState, useEffect } from 'react'
export default function App() {
    const [data, setData] = useState([])
    const [getcountry, setCountry] = useState()
    const [getstates, setStates] = useState([])
    const [selectedState, setSelectedState] = useState()
    const [getcities, setCities] = useState([])
    useEffect(() => {
        const url = 'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json'
        let promise = fetch(url)
        promise.then((response) => {
            return response.json()
        }).then((pdata) => {
            // console.log(pdata)
            // var pdata = JSON.stringify(pdata)
            setData(data => pdata)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    console.log(data)

    const country = [... new Set(data.map((item) => {
        return item.country
    }))]
    country.sort()
    // console.log(data)

    let handleCountry = (e) => {
        let states = data.filter((states) => {
            return states.country === e.target.value
        })
        // console.log(states)

        states = [...new Set(states.map((item) => {
            return item.subcountry
        }))]
        states.sort()
        setStates(getstates => states)
    }
    let handleState = (e) => {
        let cities = data.filter((city) => {
            return city.subcountry === e.target.value
        })
        cities = [...new Set(cities.map((item) => {
            return item.name
        }))]
        // console.log(cities)
        cities.sort()
        setCities(getcities => cities)
    }
    return (
        <div>
            <label>Country : </label>
            <select onChange={(e) => handleCountry(e)} >
                <option>Select country ...</option>
                {country.map((item, index) => {
                    return < option value={getcountry} key={item}>{item}</option>
                })}
            </select> <br />


            <label>State : </label>
            <select onChange={(e) => handleState(e)} >
                <option>Select State ...</option>
                {getstates.map((item, index) => {
                    return <option value={selectedState} key={item}>{item}</option>
                })}
            </select> <br />

            <label>City : </label>
            <select >
                <option>Select City ...</option>
                {getcities.map((item, index) => {
                    return <option key={index}>{item}</option>
                })}
            </select> <br />
        </div >
    )


}