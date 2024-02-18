import clsx from "clsx"
import { InputHTMLAttributes, useCallback, useState } from "react"

export type InputComponentProps =
    Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onChangeCapture'> & {
    type: InputHTMLAttributes<HTMLInputElement>['type'] | 'trimmed'
    onValueChange?: (value: string) => void
}

export const InputComponent = ({ className, onValueChange, value, type, ...props}: InputComponentProps) => {
    const [internal, setInternal] = useState(value ?? 'abcd')
    const onInternal = useCallback((event) => {
        const newValue = event.target.value.trim()
        setInternal(newValue)
        onValueChange?.(newValue)
    }, [])
    return <input {...props} onChange={onInternal} type={type === 'trimmed' ? 'text' : type} value={internal} className={clsx('my-input', className)} />
}
