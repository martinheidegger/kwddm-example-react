import { DependencyList, useEffect, useState } from "react"
import { InputComponent } from './InputComponent'

function useAsync <T>(fn: (signal: AbortSignal) => Promise<T>, deps?: DependencyList) {
    const [data, setData] = useState<T | undefined>()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        const controller = new AbortController()
        const { signal } = controller
        fn(signal).then(
            setData,
            err => /*console.log(err.name)*/ {}
        ).finally(() => setLoading(false))
        return () => controller.abort()
    }, deps)
    return { data, loading }
}

export const App = () => {
    // state
    const [input, setInput] = useState('')
    // useEffect
    // use....
    const { data, loading } = useAsync(
        async (signal) => {
            const res = await fetch('https://httpbin.io/uuid', { signal })
            if (signal.aborted) return;
            const data = await res.json()
            if (signal.aborted) return;
            return data as { uuid: string }
        },
        [input]
    )

    const onValueChange = (val: string) => console.log({ val })

    return <>
        {loading && 'loading...'}
        {input}<br/>
        <InputComponent className="kwddm" type="trimmed" onValueChange={onValueChange} /><br />
        <input className="kwddm" type="text" /><br />
        {/* <input type={''} value={input} onChange={e => setInput(e.target.value)} /><br /> */}
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
}