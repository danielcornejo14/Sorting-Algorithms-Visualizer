import './CardHeader.scss'

interface CardHeaderProps {
    title: string,
    align?: 'left' | 'center' | 'right'
}

export function CardHeader({ title, align }: CardHeaderProps) {
    const className = `card-header ${align? align : ''}`
    return (
        <div className={className}>
            <h1>{title}</h1>
        </div>
    )
}