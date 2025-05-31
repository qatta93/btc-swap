export default function Label({ children, className }: { children: React.ReactNode, className: string }) {
  return <label className={`text-sm mb-1 block text-gray-500 dark:text-gray-400 ${className}`}>{children}</label>;
}
