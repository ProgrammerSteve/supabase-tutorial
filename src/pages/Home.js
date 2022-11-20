import supabase from "../config/supabaseClient"
import {useEffect, useState} from 'react'
import SmoothieCard from "../components/SmoothieCard"

const Home = () => {
  console.log(supabase)
  const [fetchError, setFetchError]=useState(null)
  const [smoothies, setSmoothies]=useState(null)

  useEffect(()=>{
    const fetchSmoothies=async()=>{
      const {data,error}=await supabase.from('smoothies').select()
      if(error){
        setFetchError('Could not fetch smoothies')
        setSmoothies(null)
        console.log(error)
      }
      if(data){
        setSmoothies(data)
        setFetchError(null)
      }
    }
    fetchSmoothies()
  },[])

  return (
    <div className="page home">
      <h2>Home</h2>
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className='smoothies'>
          {/* Order by Button */}
          <div className="smoothie-grid">
            {smoothies.map(smoothie=>(
              <SmoothieCard key={smoothie.id} smoothie={smoothie}/>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home