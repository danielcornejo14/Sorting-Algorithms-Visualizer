import './Select.scss'
interface SelectProps {
    options: options[];
    onChange: (selectedValue: number) => void;
}

interface options {
    value: number;
    label: string;
}

export function Select({ options, onChange }: SelectProps) {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {   
        const selectedValue = parseInt(event.target.value);
        onChange(selectedValue);
    }
    return (
        <select className="select" onChange={handleSelectChange}>
            {options.map((item) => {
                return (
                    <option className="option" value={item.value}>{item.label}</option>
                )
            })}
        </select>
    )
}