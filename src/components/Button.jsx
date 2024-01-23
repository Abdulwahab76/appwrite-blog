import React from "react";
import Spinner from "./Spinner";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    loading = false,
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
            disabled={loading}
            {...props}
        >
            {loading ? <div className="flex items-center justify-center">
                <Spinner />
            </div> : children}
        </button>
    );
}
