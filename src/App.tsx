import './App.css'
import {Button, Input} from "@nextui-org/react";
import {useEffect, useState} from "react";
import axios from 'axios';

const queue_url = "URL_HERE"


function App() {
    const [queue, setqueue] = useState([] as string[])
    useEffect(() => {
        getQueue().then(queue => {
            setqueue(queue)
            console.log("useEffect")
            console.log(queue)
        })
    },[])
  return (
      <>
      <div style={{paddingTop:"20px", paddingLeft: "20px"}}>
          <h1 className="text-white font-bold text-4xl content-center">DevBot</h1>
      </div>
        <div className="w-72 h-full" style={{paddingTop:"50px", paddingLeft: "20px"}}>
              <Input id="name-input" isRequired label="Name" classNames={{
                  label: "text-white font-bold",
                  base: ["#021526", "data-required"],
                  innerWrapper: "bg-transparent",
                  input:[
                      "bg-transparent",
                      "text-white",
                  ],
                  inputWrapper: [
                      "bg-gray-400",
                      "border-1",
                      "text-white"
                  ],
              }}/>

            <Button className="text-white bg-neutral-500/50 text-2xl content-center" style={{marginTop: "20px"}} onClick={ () =>{

                submitName((document.getElementById("name-input") as HTMLInputElement).value).then(queue => {
                    setqueue(queue)
                    console.log("in button")
                    console.log(queue)})

            }}
            >Submit</Button>
        </div>

          <div style={{paddingTop:"50px", paddingLeft:"20px"}}>
              <h1 className="text-white font-bold text-4xl content-center"> QUEUE</h1>
                <div style={{paddingTop:"20px"}}>
                    <QueueList queue={queue} setqueue={setqueue}/>
                </div>
          </div>
      </>
  )
}

function QueueList({queue,setqueue}: {queue: string[], setqueue: React.Dispatch<React.SetStateAction<string[]>>}): JSX.Element | JSX.Element[] {
    if (queue.length == 0) {
        return <div className="text-white font-bold text-2xl content-center">Queue is empty</div>
    }
    return(queue.map(function (name:string, index: number) {

        return<div key={index}> <Button  className="text-white bg-neutral-500/50 text-2xl content-center" style={{marginTop:"10px"}} onClick={
            () => {
                deleteName(name).then(queue => {
                    setqueue(queue)
                    console.log(queue)
                })
            }
        }>
            {index+1}. {name}</Button>
        </div>
    }))
}

async function getQueue(): Promise<string[]>{
    const queueData = await axios.get<string[]>(queue_url)
    if (queueData.data != null) {
        return queueData.data
    }
    return []
}

async function deleteName(name: string): Promise<string[]>{
    const queueData = await axios.delete<string[]>(queue_url+`/${name}`)
    if (queueData.data != null) {
        return queueData.data
    }
    return getQueue()
}

async function submitName(name?: string): Promise<string[]>{
    if (name) {
        const queueData = await axios.post<string[]>(queue_url,{"name":name})
        if (queueData.data != null) {
            return queueData.data
        }
    }
    return getQueue()
}

export default App
