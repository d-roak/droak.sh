import { useFocusable } from "@droak/wterm";

export function ProjectLink({ name, description, href }: { name: string; description: string; href: string }) {
  const f = useFocusable({
    label: name,
    group: "Projects",
    onSelect: () => window.open(href, "_blank"),
  });
  return (
    <a {...f} href={href} target="_blank" rel="noopener noreferrer" className={`${f.className} project-item`}>
      <strong>{name}</strong>
      <span className="muted"> — {description}</span>
    </a>
  );
}
