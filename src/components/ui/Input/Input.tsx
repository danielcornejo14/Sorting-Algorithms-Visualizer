import './Input.scss'
interface InputProps {
    type: 'text' | 'number',
    disabled: boolean,
    max: number,
    min: number,
    value: number,
    onChange: (newValue: number) => void,
    onBlur: () => void
}

export function Input({ type, disabled, max, min, value, onChange, onBlur }: InputProps){
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        onChange(newValue);
      };

    return(
        <input disabled={disabled} className='input' type={type} max={max} min={min} value={value} onChange={handleChange} onBlur={onBlur}/>
    )

}