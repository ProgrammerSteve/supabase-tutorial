import supabase from "../config/supabaseClient"
import {useEffect, useState} from 'react'
import SmoothieCard from "../components/SmoothieCard"

const Home = () => {
  console.log(supabase)
  const [fetchError, setFetchError]=useState(null)
  const [smoothies, setSmoothies]=useState(null)
  const [orderBy,setOrderBy]=useState('created_at')

  const handleDelete=(id)=>{
    setSmoothies(prevSmoothies=> prevSmoothies.filter(smoothie=>smoothie.id!==id))
  }

  useEffect(()=>{
    const fetchSmoothies=async()=>{
      const {data,error}=await supabase
        .from('smoothies')
        .select()
        .order(orderBy,{ascending: false})
        
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
  },[orderBy])

  return (
    <div className="page home">
      <h2>Home</h2>
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className='smoothies'>
          {/* Order by Button */}
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={()=>setOrderBy('created_at')}>Time Created</button>
            <button onClick={()=>setOrderBy('title')}>Title</button>
            <button onClick={()=>setOrderBy('rating')}>Rating</button>
          </div>


          <div className="smoothie-grid">
            {smoothies.map(smoothie=>(
              <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete}/>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home