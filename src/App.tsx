import './App.css'
import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from 'axios';
import {base_url} from "./const.ts";


function App() {
    const [queue, setqueue] = useState([] as string[])
    const [input, setinput] = useState("")
    // load queue on page load
    useEffect(() => {
        getQueue().then(queue => {
            setqueue(queue)
        })
    }, [])

    return (
        <>
            <div style={{ paddingTop: "20px", paddingLeft: "20px" }}>
                <h1 className="text-white font-bold text-4xl content-center">DevBot</h1>
            </div>
            <div className="w-72 h-full" style={{ paddingTop: "50px", paddingLeft: "20px" }}>
                <Input value={input} onChange={(e) => setinput(e.target.value)} id="name-input" isRequired label="Name" classNames={{
                    label: "text-white font-bold",
                    base: ["#021526", "data-required"],
                    innerWrapper: "bg-transparent",
                    input: [
                        "bg-transparent",
                        "text-white",
                    ],
                    inputWrapper: [
                        "bg-gray-400",
                        "border-1",
                        "text-white"
                    ],
                }} />

                <Button className="text-white bg-neutral-500/50 text-2xl content-center" style={{ marginTop: "20px" }} onClick={() => {

                    submitName(input).then(queueData => {
                        setqueue(queueData);
                        setinput("");
                    });

                }}
                >Submit</Button>
            </div>

            <div style={{ paddingTop: "50px", paddingLeft: "20px" }}>
                <h1 className="text-white font-bold text-4xl content-center"> QUEUE</h1>
                <div style={{ paddingTop: "20px" }}>
                    <QueueList queue={queue} setqueue={setqueue} />
                </div>
            </div>
        </>
    )
}

// QueueList displays the list of names in the queue or filler text for when the queue is empty.ß
function QueueList({ queue, setqueue }: { queue: string[], setqueue: React.Dispatch<React.SetStateAction<string[]>> }): JSX.Element | JSX.Element[] {
    if (queue.length == 0) {
        return <div className="text-white font-bold text-2xl content-center">Queue is empty</div>
    }
    return (queue.map(function (name: string, index: number) {

        return <div key={index}> <Button className="text-white bg-neutral-500/50 text-2xl content-center" style={{ marginTop: "10px" }} onClick={
            () => {
                deleteName(name).then(queue => {
                    setqueue(queue)
                })
            }
        }>
            {index + 1}. {name}</Button>
        </div>
    }))
}

// get the queue from the API
async function getQueue(): Promise<string[]> {
    const queueData = await axios.get<string[]>(base_url+"/queue")
    if (queueData.data != null) {
        return queueData.data
    }
    return []
}

// Delete a name from the queue. Works on the assumption a name can only be in the queue once
async function deleteName(name: string): Promise<string[]> {
    const queueData = await axios.delete<string[]>(base_url+`/queue/${name}`)
    if (queueData.data != null) {
        return queueData.data
    }
    return getQueue()
}

// submitName adds a name to the queuee, and then ret urns the updated queue.
async function submitName(name?: string): Promise<string[]> {
    if (name) {
        const queueData = await axios.post<string[]>(base_url+"/queue", { "name": name })
        if (queueData.data != null) {
            return queueData.data
        }
    }
    return getQueue()
}

export default App
