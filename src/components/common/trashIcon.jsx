import { Trash } from 'lucide-react';
import React from 'react';

export const TrashIcon = ({ className, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={className}
            aria-label="Eliminar producto"
        >
            <Trash size={16} />
        </button>
    );
}