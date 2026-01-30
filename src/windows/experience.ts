import { baseWindow } from "../shared/base-window";
import experienceData from "../../EXPERIENCE_DATA.json";

interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string[];
}

export const openExperience = () => {
  if (<HTMLSpanElement>document.getElementById("experience")) return;
  const content = document.createElement("div");
  content.id = "experience";
  content.className = "p-4 overflow-y-auto";
  
  let experienceHTML = '<h1 class="font-semibold text-2xl mb-6">Experience</h1>';
  
  (experienceData as Experience[]).forEach((exp: Experience, index: number) => {
    experienceHTML += `
      <div class="mb-6 ${index > 0 ? 'pt-6 border-t border-pastel-grey' : ''}">
        <div class="flex justify-between items-start mb-2">
          <h2 class="font-semibold text-lg text-pastel-dark-grey">${exp.role}</h2>
        </div>
        <p class="text-sm text-pastel-dark-grey mb-1">${exp.company} • ${exp.location}</p>
        <p class="text-xs text-pastel-grey mb-3">${exp.period}</p>
        <ul class="list-disc list-inside space-y-1">
          ${exp.description.map((desc: string) => `<li class="text-sm">${desc}</li>`).join('')}
        </ul>
      </div>
    `;
  });
  
  content.innerHTML = experienceHTML;

  baseWindow("w-96 h-96 md:w-[600px] md:h-[500px]", content);
};
