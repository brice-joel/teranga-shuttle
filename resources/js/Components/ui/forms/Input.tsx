// resources/js/Components/ui/forms/Input.tsx
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export default function Input({
    label,
    error,
    className = "",
    ...props
}: Props) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-slate-700">
                {label}
            </label>
            <input
                {...props}
                className={`px-4 py-2.5 rounded-lg border bg-white transition-all focus:ring-2 focus:ring-slate-900 outline-none 
                ${error ? "border-red-500" : "border-slate-200"} ${className}`}
            />
            {error && (
                <span className="text-xs text-red-500 font-medium">
                    {error}
                </span>
            )}
        </div>
    );
}
