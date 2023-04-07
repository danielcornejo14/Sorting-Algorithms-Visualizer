import React from 'react';
import './Card.scss';

interface CardProps {
    cardOptions?: CardOptions;
    children: React.ReactNode;
}

interface CardOptions {
    backgroundColor?: string;
    appearance?: 'outlined' | 'raised';
}
export function Card({ cardOptions, children }: CardProps) {
    
    return (
        <div className={`card ${cardOptions?.appearance? cardOptions.appearance : ''}`} style={{ backgroundColor: cardOptions?.backgroundColor }}>
            {children}
        </div>
    )
};