import * as icons from "lucide-react";
import type { LucideProps } from "lucide-react";

type IconMap = Record<string, React.ComponentType<LucideProps>>;

/** Renders a Lucide icon by name (icon names are stored in MongoDB). */
export function Icon({
  name,
  fallback = "Sparkles",
  ...props
}: LucideProps & { name?: string | undefined; fallback?: string }) {
  const map = icons as unknown as IconMap;
  const Component = (name && map[name]) || map[fallback] || map["Sparkles"];
  if (!Component) return null;
  return <Component aria-hidden {...props} />;
}
