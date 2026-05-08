type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'danger';
    loading?: boolean;
};

export function Button({
    children,
    variant = 'primary',
    loading = false,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles =
        'px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary:
            'bg-blue-600 text-white hover:bg-blue-700',
        secondary:
            'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
        danger: "shrink-0 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? 'Submitting…' : children}
        </button>
    );
}