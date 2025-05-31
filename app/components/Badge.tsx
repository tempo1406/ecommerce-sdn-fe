'use client';

interface BadgeProps {
  text: string;
  color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'green';
  icon?: React.ReactNode;
}

export default function Badge({ text, color = 'primary', icon }: BadgeProps) {  const colorClasses = {
    primary: 'bg-primary-100 text-primary-800 border-primary-200',
    secondary: 'bg-gray-100 text-gray-800 border-gray-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    green: 'bg-green-100 text-green-800 border-green-200',
  };
    return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border flex items-center gap-1 ${colorClasses[color]}`}>
      {icon && <span className="inline-flex">{icon}</span>}
      {text}
    </span>
  );
}
