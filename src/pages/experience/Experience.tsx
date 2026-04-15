import { Box } from "@droak/wterm";
import experiences from "../../../data/experience.json";

interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  website?: string;
  description: string[];
}

export function Experience() {
  return (
    <div className="section-stack">
      {(experiences as Experience[]).map((exp) => (
        <Box key={exp.company} title={exp.company}>
          <p>
            <strong>{exp.role}</strong>
          </p>
          <p className="muted">
            {exp.location} &middot; {exp.period}
            {exp.website && (
              <>
                {" "}&middot;{" "}
                <a href={exp.website} target="_blank" rel="noopener noreferrer">
                  {exp.website.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </>
            )}
          </p>
          <br />
          <ul>
            {exp.description.map((desc, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: desc }} />
            ))}
          </ul>
        </Box>
      ))}
    </div>
  );
}
