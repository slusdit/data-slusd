'use client'

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react"

export default  function Test({params}: {params: {pokemon: string}}) {
    const pokemon = params.pokemon;
    const [number, setNumber] = useState('');
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        fetchData(number);
    }, [number])
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumber(event.target.value);
    };
    
    const fetchData = (number: string) => {
        setLoading(true);
        fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
            .then(res => res.json())
            .then(fetchedData => {
                console.log(fetchedData)
                setData(fetchedData)
                setLoading(false)
            })
            .catch(err => console.error(err))
    }

    console.log(data.name)

    return (
        <div>
            Test
            <br/>
            <label htmlFor="pokemon">Number:</label>
            <Input className="w-20 bg-card border-foreground/25"  id="pokemon" type="text" value={number} onChange={handleInputChange} />
            <div
            className="p-4 m-4 border-2 min-w-1/4 border-primary rounded-lg w-fit"
            >
            {loading ? 'Loading...' : 
            <div>

             Name: {data?.name}
             <br />   
             Abilities: {data?.abilities?.map((a: any) => a.ability.name).join(', ')}
            </div>
              
            }
           </div>
        </div>
    )
}