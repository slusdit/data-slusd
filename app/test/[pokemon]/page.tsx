'use client'

import { useEffect, useState } from "react"

export default  function Test({params}: {params: {pokemon: string}}) {

    const pokemon = params.pokemon


    
    const[data, setData] = useState({})
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(res => res.json())
            .then(fetchedData => {
                console.log(fetchedData)
                setData(fetchedData)})
            .catch(err => console.error(err))
    }, [])
    // const data =  fetch('https://pokeapi.co/api/v2/pokemon/35').then(res => res.json())
    console.log(data.name)

    return (
        <div>
            Test
            <br/>
           Pokemon Name: {data?.name}
        </div>
    )
}