import React from 'react'
import FaceExpression from '../../expressions/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../Hooks/useSong'


const Home = () => {
    const { loading, handleGetsong, song } = useSong();
  return (
    <div>
        <FaceExpression onClick={(expression)=>handleGetsong({mood: expression})    }/>
        <Player/>
    </div>
  )
}

export default Home