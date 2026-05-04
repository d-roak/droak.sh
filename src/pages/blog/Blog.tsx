import { useMemo, useState } from "react";
import { Box, Input, List } from "@droak/wterm";
import { marked } from "marked";
import { type BlogPost, blogPosts, blogTags } from "./loader";

interface BlogProps {
	postSlug: string | null;
	tag: string | null;
	onPostChange: (slug: string | null) => void;
	onTagChange: (tag: string | null) => void;
}

const ALL_TAG_ID = "__all__";

function formatPublished(dateStr: string): string {
	const d = new Date(dateStr);
	if (Number.isNaN(d.getTime())) return dateStr;
	const day = String(d.getUTCDate()).padStart(2, "0");
	const month = d
		.toLocaleString("en-US", { month: "short", timeZone: "UTC" })
		.toLowerCase();
	const year = d.getUTCFullYear();
	return `${day} ${month} ${year}`;
}

function PostHeader({
	post,
	onTagChange,
}: {
	post: BlogPost;
	onTagChange: (tag: string | null) => void;
}) {
	if (post.tags.length === 0 && !post.date) return null;
	return (
		<header className="blog-meta">
			{post.date && (
				<div className="blog-meta-row">
					<span className="blog-meta-label">Published:</span>
					<span className="blog-meta-date">{formatPublished(post.date)}</span>
				</div>
			)}
			{post.tags.length > 0 && (
				<div className="blog-meta-row">
					<span className="blog-meta-label">Tags:</span>
					<span>
						{post.tags.map((name, i) => (
							<span key={post.tagSlugs[i]}>
								{i > 0 && <span className="blog-meta-sep"> · </span>}
								<button
									type="button"
									className="blog-tag-link"
									onClick={() => onTagChange(post.tagSlugs[i])}
								>
									{name}
								</button>
							</span>
						))}
					</span>
				</div>
			)}
		</header>
	);
}

export function Blog({ postSlug, tag, onPostChange, onTagChange }: BlogProps) {
	const [query, setQuery] = useState("");
	const [showAdvanced, setShowAdvanced] = useState(false);
	const [dateFrom, setDateFrom] = useState("");
	const [dateTo, setDateTo] = useState("");

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		return blogPosts.filter((p) => {
			if (tag && !p.tagSlugs.includes(tag)) return false;
			if (dateFrom && p.date < dateFrom) return false;
			if (dateTo && p.date > dateTo) return false;
			if (!q) return true;
			return p.title.toLowerCase().includes(q);
		});
	}, [tag, query, dateFrom, dateTo]);

	const activeFilters: {
		key: string;
		label: string;
		value: string;
		clear: () => void;
	}[] = [];
	if (tag) {
		const t = blogTags.find((x) => x.slug === tag);
		activeFilters.push({
			key: `tag-${tag}`,
			label: "tag",
			value: t?.name ?? tag,
			clear: () => onTagChange(null),
		});
	}
	if (dateFrom) {
		activeFilters.push({
			key: "from",
			label: "from",
			value: formatPublished(dateFrom),
			clear: () => setDateFrom(""),
		});
	}
	if (dateTo) {
		activeFilters.push({
			key: "to",
			label: "to",
			value: formatPublished(dateTo),
			clear: () => setDateTo(""),
		});
	}

	const fallbackId = filtered[0]?.id ?? null;
	const selectedId =
		postSlug && filtered.some((p) => p.id === postSlug) ? postSlug : fallbackId;
	const selected = filtered.find((p) => p.id === selectedId);

	const items = filtered.map((p) => ({
		id: p.id,
		label: `${p.title}  (${new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })})`,
	}));

	const tagItems = [
		{ id: ALL_TAG_ID, label: `all  (${blogPosts.length})` },
		...blogTags.map((t) => ({ id: t.slug, label: `${t.name}  (${t.count})` })),
	];

	return (
		<div className="blog-layout">
			<div className="blog-sidebar">
				<Box title="filter">
					<div className="filter-search">
						<Input
							value={query}
							onChange={setQuery}
							placeholder="search title..."
						/>
					</div>
					{activeFilters.length > 0 && (
						<div className="filter-active">
							{activeFilters.map((f) => (
								<button
									key={f.key}
									type="button"
									className="filter-chip"
									onClick={f.clear}
									aria-label={`remove ${f.label} filter`}
								>
									<span className="filter-chip-label">{f.label}:</span>
									<span className="filter-chip-value">{f.value}</span>
									<span className="filter-chip-x" aria-hidden="true">
										×
									</span>
								</button>
							))}
						</div>
					)}
					<button
						type="button"
						className="filter-toggle"
						onClick={() => setShowAdvanced((s) => !s)}
						aria-expanded={showAdvanced}
					>
						<span className="filter-toggle-caret">
							{showAdvanced ? "▾" : "▸"}
						</span>
						<span>advanced</span>
					</button>
					{showAdvanced && (
						<div className="filter-advanced">
							<div className="filter-field">
								<label className="filter-label" htmlFor="filter-date-from">
									from
								</label>
								<Input
									type="date"
									value={dateFrom}
									onChange={setDateFrom}
								/>
							</div>
							<div className="filter-field">
								<label className="filter-label" htmlFor="filter-date-to">
									to
								</label>
								<Input
									type="date"
									value={dateTo}
									onChange={setDateTo}
								/>
							</div>
							<div className="filter-field">
								<span className="filter-label">tags</span>
								<List
									items={tagItems}
									selectedId={tag ?? ALL_TAG_ID}
									onSelect={(id) =>
										onTagChange(id === ALL_TAG_ID ? null : id)
									}
									group="WritingsTags"
								/>
							</div>
						</div>
					)}
				</Box>
				<Box title="posts">
					{items.length > 0 ? (
						<List
							items={items}
							selectedId={selectedId ?? undefined}
							onSelect={onPostChange}
							group="Writings"
						/>
					) : (
						<p className="muted">no matches</p>
					)}
				</Box>
			</div>
			<Box title={selected?.title ?? "select a post"}>
				{selected ? (
					<>
						<PostHeader post={selected} onTagChange={onTagChange} />
						<hr className="blog-meta-divider" />
						<div
							className="blog-content"
							dangerouslySetInnerHTML={{
								__html: marked.parse(selected.content) as string,
							}}
						/>
					</>
				) : (
					<p className="muted">no posts match the current filters.</p>
				)}
			</Box>
		</div>
	);
}
