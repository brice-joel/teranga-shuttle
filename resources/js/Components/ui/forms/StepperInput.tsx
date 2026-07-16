import React from "react";
import { Minus, Plus } from "lucide-react";

interface StepperInputProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

export default function StepperInput({
    value,
    onChange,
    min = 0,
    max = 100,
}: StepperInputProps) {
    const decrement = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    const increment = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    return (
        <div className="flex items-center space-x-3 bg-white rounded-lg border border-slate-200 p-1">
            <button
                type="button"
                onClick={decrement}
                disabled={value <= min}
                className="p-1.5 rounded-md bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-slate-900 w-6 text-center text-sm">
                {value}
            </span>
            <button
                type="button"
                onClick={increment}
                disabled={value >= max}
                className="p-1.5 rounded-md bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <Plus className="w-4 h-4" />
            </button>
        </div>
    );
}
