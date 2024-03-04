import React, { useRef, useState } from 'react'
import './Quizapp.css'
import { data } from '../Assets/data'

const Quizapp = () => {
  
  let [index,setIndex] = useState(0);
  let [qustion,setQustion] = useState(data[index]);
  let [lock,setLock] = useState(false);
  let [score,setScore] = useState(0)
  let [result,setResult] = useState(false)

  let option1 = useRef(null)
  let option2 = useRef(null)
  let option3 = useRef(null)
  let option4 = useRef(null)

  let option_array = [option1,option2,option3,option4]

  const checkAns =(e,ans)=>{
    if(lock === false){
      if(qustion.ans===ans){
    e.target.classList.add('correct')
    setLock(true)
    setScore(prev=>prev+1)
   }else{
    e.target.classList.add('incorrect')
    setLock(true)
    option_array[qustion.ans-1].current.classList.add('correct')
   }
    }
   
  }

  const next = ()=>{
    if(lock===true){
      if(index===data.length-1){
        setResult(true);
        return 0
      }
      setIndex(++index);
      setQustion(data[index]);
      setLock(false);
      option_array.map((option)=>{
        option.current.classList.remove('correct');
        option.current.classList.remove('incorrect')
      })
    }
  }

  const reset = ()=>{
    setIndex(0)
    setQustion(data[0])
    setLock(false)
    setScore(0)
    setResult(false)
  }

  return (
    <div className='box'>
    <h1>Quiz app</h1>
    <hr />
     {result?<></>:<>  <h2>{index+1}. {qustion.question}</h2>
      
      <ul>
        <li ref={option1} onClick={(e)=>{checkAns(e,1)}}>{qustion.option1}</li>
        <li ref={option2} onClick={(e)=>{checkAns(e,2)}}>{qustion.option2}</li>
        <li ref={option3} onClick={(e)=>{checkAns(e,3)}}>{qustion.option3}</li>
        <li ref={option4} onClick={(e)=>{checkAns(e,4)}} >{qustion.option4}</li>
      </ul>
      <button onClick={()=>{next()}}>Next</button>
      <p className='index'>{index+1} of {data.length} questions</p> </>}
      {result?<><h2>You scored {score} out of {data.length}</h2>
    <button onClick={()=>{reset()}}>Reset</button> </>:<></>}
    
    
    </div>
  )
}

export default Quizapp