import './SecondaryBtn.scss';

interface SecondaryBtnProps {
    text: string;
    disabled: boolean;
    onClick: () => void;
}

export function SecondaryBtn({ text, disabled, onClick }: SecondaryBtnProps) {
    
    return (
        <button className="secondary-btn" disabled={disabled} onClick={onClick}>
            {text}
        </button>
    );
}