import { Box } from "@droak/wterm";
import experiences from "../../../data/experience.json";
import education from "../../../data/education.json";

interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  website?: string;
  description: string[];
}

interface Education {
  school: string;
  degree: string;
  location: string;
  period: string;
  website?: string;
  description: string[];
}

export function Experience() {
  return (
    <div className="section-stack">
      <div className="section-divider">Education</div>
      {(education as Education[]).map((edu) => (
        <Box key={edu.school} title={edu.school}>
          <p>
            <strong>{edu.degree}</strong>
          </p>
          <p className="muted">
            {edu.location} &middot; {edu.period}
            {edu.website && (
              <>
                {" "}&middot;{" "}
                <a href={edu.website} target="_blank" rel="noopener noreferrer">
                  {edu.website.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </>
            )}
          </p>
          <br />
          <ul>
            {edu.description.map((desc, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: desc }} />
            ))}
          </ul>
        </Box>
      ))}
      <div className="section-divider">Experience</div>
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
