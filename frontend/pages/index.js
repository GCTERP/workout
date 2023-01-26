import { useEffect, useState } from "react"

// Stateless Functional Component
const Static = () => {
    return (
        <div>Some Content</div>
    )
}

// Stateful Functional Component
const StaticState = () => {

    let [ state, setState ] = useState(null)

    return (
        <div>
            {
                state
            }
        </div>
    )
}

// Props

const PropComponent = ({ variable }) => {

    return (
        <div>{ variable }</div>
    )
}

// useEffect & axios Component
const GetData = () => {

    let [ data, setData ] = useState(null)

    useEffect(() => {

        const res = "Data";

        setData(res)

    }, [])

    return (
        data &&
        <div>{ data }</div>
    )
}

// Accessor Mutator Component
const Parent = () => {

    let [ data, setData ] = useState(null)

    return (
        <>
            <Mutator setContent={setData}/>
            <Accessor content={data}/>
        </>
    )

}

const Mutator = ({ setContent }) => {

    const convertState = () => {

        setContent(3);

    }

    return (
        <div onClick={() => convertState()}>Content</div>
    )
}

const Accessor = ({ content }) => {

    let [ data, setData ] = useState(null)

    useEffect(() => {
        const result = content;
        setData(result);
    })

    return(
        content ?
        <div>{ content }</div> : <p>No Content Loaded</p>
    )
}