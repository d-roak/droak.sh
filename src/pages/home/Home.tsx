import { Box } from "@droak/wterm";
import about from "../../../data/about.json";
import socials from "../../../data/socials.json";
import projects from "../../../data/projects.json";
import metrics from "../../../data/metrics.json";
import { ProjectLink } from "./ProjectLink";

const ASCII_BANNER = `
     _                 _          _
  __| |_ __ ___   __ _| | __  ___| |__
 / _\` | '__/ _ \\ / _\` | |/ / / __| '_ \\
| (_| | | | (_) | (_| |   < _\\__ \\ | | |
 \\__,_|_|  \\___/ \\__,_|_|\\_(_)___/_| |_|
`;

export function Home() {
	return (
		<div className="home-layout">
			<div className="home-header">
				<pre className="ascii-banner">{ASCII_BANNER}</pre>
				<div className="home-header-right">
					<div className="header-col">
						<div className="header-line">
							<span className="muted">email </span>
							<a href={`mailto:${about.contact.email}`}>
								{about.contact.email}
							</a>
						</div>
						<div className="header-line">
							<span className="muted">web </span>
							<a href={`https://${about.contact.web}`}>{about.contact.web}</a>
						</div>
					</div>
					<div className="header-col">
						{socials.map((s) => (
							<div key={s.label} className="header-line">
								<span className="muted">{s.label} </span>
								<a href={s.href} target="_blank" rel="noopener noreferrer">
									{s.handle}
								</a>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="home-grid">
				<div className="home-left">
					<Box title="about">
						<p>{about.headline}</p>
						<br />
						<p dangerouslySetInnerHTML={{ __html: about.bio }} />
						<br />
						<p>
							Navigate with the tabs above or press <strong>Cmd+K</strong> to
							open the command palette.
						</p>
					</Box>
				</div>

				<div className="home-right">
					<Box title="metrics">
						<div className="metrics-grid">
							{metrics.map((m) => (
								<div key={m.label} className="metric">
									<span className="metric-value">{m.value}</span>
									<span className="muted">{m.label}</span>
								</div>
							))}
						</div>
					</Box>

					<Box title="current projects">
						<div className="link-list">
							{projects.map((p) => (
								<ProjectLink
									key={p.name}
									name={p.name}
									description={p.description}
									href={p.href}
								/>
							))}
						</div>
					</Box>
				</div>
			</div>
		</div>
	);
}
