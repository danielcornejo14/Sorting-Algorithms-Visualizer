import './Select.scss'
interface SelectProps {
    options: options[];
    disabled: boolean;
    onChange: (selectedValue: number) => void;
}

interface options {
    value: number
    label: string;
    method: () => void;
}


export function Select({ options, disabled, onChange }: SelectProps) {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {   
        const selectedValue = parseInt(event.target.value);
        onChange(selectedValue);
    }
    return (
        <select disabled={disabled} className="select" onChange={handleSelectChange}>
            {options.map((item) => {
                return (
                    <option className="option" value={item.value}>{item.label}</option>
                )
            })}
        </select>
    )
}