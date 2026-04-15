import { useState } from "react";
import { Box, List } from "@droak/wterm";
import { marked } from "marked";
import { blogPosts } from "./loader";

export function Blog() {
	const [selectedId, setSelectedId] = useState<string | null>(
		blogPosts.length > 0 ? blogPosts[0].id : null,
	);
	const selected = blogPosts.find((p) => p.id === selectedId);

	const items = blogPosts.map((p) => ({
		id: p.id,
		label: `${p.title}  (${new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })})`,
	}));

	return (
		<div className="blog-layout">
			<Box title="posts">
				<List
					items={items}
					selectedId={selectedId ?? undefined}
					onSelect={setSelectedId}
					group="Writings"
				/>
			</Box>
			<Box title={selected?.title ?? "select a post"}>
				{selected ? (
					<div
						className="blog-content"
						dangerouslySetInnerHTML={{
							__html: marked.parse(selected.content) as string,
						}}
					/>
				) : (
					<p className="muted">Select a post from the list.</p>
				)}
			</Box>
		</div>
	);
}
