'use client'

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react"

export default  function Test({params}: {params: {id: string}}) {
    const stuId = params.id;
    const [number, setNumber] = useState(stuId);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    
    const fetchData = ({id}: {id: string}) => {
        console.log(id)
        // setLoading(true);
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => res.json())
            .then(fetchedData => {
                console.log(fetchedData)
                setLoading(false)
                setData(fetchedData)
            })
            .catch(err => console.error(err))
    }


    // useEffect(() => {
    //         if(stuId) {
    //         fetchData({id: stuId})
    //         // setNumber(stuId)
    //     }
    // }, [])

    useEffect(() => {

        fetchData({id: number});
    }, [number])
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setNumber(event.target.value);
    };
    

    console.log(data.name)

    return (
        <div className="w-full">
            Test
            <br/>
            <label htmlFor="pokemon">Number:</label>
            <Input className="w-20 bg-card border-foreground/25"  id="pokemon" type="text" value={number} onChange={handleInputChange} />
            <div
            className="p-4 m-4 bg-card min-w-1/2 border-primary rounded-lg w-fit"
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