import './PrimaryBtn.scss';

interface PrimaryBtnProps {
    text: string;
    disabled: boolean;
    onClick: () => void;
}

export function PrimaryBtn({ text, disabled, onClick }: PrimaryBtnProps) {

    return (
        <button className="primary-btn" disabled={disabled} onClick={onClick}>
            {text}
        </button>
    );
}