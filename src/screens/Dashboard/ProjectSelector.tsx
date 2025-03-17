import { Button } from "../../components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { useProjectStore } from "../../lib/projects";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export const ProjectSelector = () => {
  const { projects, selectedProjectId, selectProject } = useProjectStore();
  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="py-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="justify-between w-full h-11 font-medium"
          >
            <span className="text-slate-800">
              {selectedProject?.name || "Select Project"}
            </span>
            <ChevronDownIcon className="w-6 h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {projects.map((project) => (
            <DropdownMenuItem
              key={project.id}
              onClick={() => selectProject(project.id)}
            >
              {project.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};