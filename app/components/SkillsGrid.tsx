// components/SkillsGrid.tsx
// Skills display grid

interface SkillsGridProps {
  skills: Array<{
    category: string;
    items: Array<{
      name: string;
      proficiencyLevel: number;
      yearsOfExperience?: number;
      icon?: string;
    }>;
  }>;
}

export function SkillsGrid({ skills }: SkillsGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skills.map((category, idx) => (
        <div
          key={idx}
          className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-500 transition-all"
        >
          <h3 className="text-xl font-bold text-cyan-400 mb-4">{category.category}</h3>
          <div className="space-y-4">
            {category.items.map((skill, skillIdx) => (
              <div key={skillIdx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{skill.name}</span>
                  {skill.yearsOfExperience && (
                    <span className="text-xs text-slate-400">
                      {skill.yearsOfExperience}y
                    </span>
                  )}
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all ${
                      skill.proficiencyLevel === 5 ? 'w-full' :
                      skill.proficiencyLevel === 4 ? 'w-4/5' :
                      skill.proficiencyLevel === 3 ? 'w-3/5' :
                      skill.proficiencyLevel === 2 ? 'w-2/5' : 'w-1/5'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}