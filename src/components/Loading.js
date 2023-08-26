import React from 'react'
import Loading from '../assets/Rolling-1s-200px.svg'

const Loader = () => {
  return (
    <div> 
        <img alt="loading" src={Loading} height={'90px'} width={'90px'}/>
    </div>
        
  )
}

export default Loader