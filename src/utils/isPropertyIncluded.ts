export default function isPropertyIncluded<T>(
  obj: T,
  prop: keyof Exclude<T, boolean>
): boolean {
  return !!obj?.[prop as keyof T];
}
