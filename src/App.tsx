import './App.css'
import {Button, Input} from "@nextui-org/react";
import {useState} from "react";
import axios from 'axios';

function App() {
    const [input, setInput] = useState("")
    const [queue, setqueue] = useState(getQueue())
  return (
      <>
      <div style={{paddingTop:"20px", paddingLeft: "20px"}}>
          <h1 className="text-white font-bold text-4xl content-center">DevBot</h1>
      </div>
        <div className="w-72 h-full" style={{paddingTop:"50px", paddingLeft: "20px"}}>
              <Input onInput={e => setInput((e.target as HTMLInputElement).value)} isRequired label="Name" classNames={{
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
            <Button style={{marginTop: "20px"}} onClick={ () => setqueue(submitName(input)) }
            >Submit</Button>
        </div>
          <div style={{paddingTop:"50px", paddingLeft:"20px"}}>
              <h1 className="text-white font-bold text-4xl content-center"> QUEUE</h1>
          {/*    QUEUE GOES HERE*/}
          </div>
      </>
  )
}

function getQueue(): string[]{
    axios.get("URL HERE").then(res => {
        console.log(res.data)
        return res.data
    })
    return []
}

function submitName(name: string): string[]{
    axios.post("URL HERE", {name: name}).then(res => {
        console.log(res.data)
        return res.data
    })
    return []
}

export default App
