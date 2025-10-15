import { useEffect } from "react";

export type BalloonType = {
    color: string;
    top: number;
    left: number;
    id: number;
    size: number;
};

interface BalloonProps {
    id: number;
    color: string;
    top: number;
    left: number;
    size: number;
    onDelete: (id: number) => void;
    onPop: (id: number) => void;
}

export const Balloon = ({
    id,
    color,
    top,
    left,
    size,
    onDelete,
    onPop,
    }: BalloonProps) => {
    useEffect(() => {
        const timer = setTimeout(() => onDelete(id), 2000);
        return () => clearTimeout(timer);
    }, [id, onDelete]);

    return (
        <div
        className={`absolute ${color} rounded-full cursor-pointer transition-transform duration-200 hover:scale-110`}
        style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
        }}
        onClick={() => onPop(id)}
        />
    );
};
