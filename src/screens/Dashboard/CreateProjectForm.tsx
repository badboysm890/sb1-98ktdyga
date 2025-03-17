import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { useProjectStore } from "../../lib/projects";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Project description is required"),
  type: z.string().min(1, "Project type is required"),
});

type ProjectForm = z.infer<typeof projectSchema>;

interface CreateProjectFormProps {
  onClose: () => void;
}

export const CreateProjectForm = ({ onClose }: CreateProjectFormProps) => {
  const { addProject } = useProjectStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = (data: ProjectForm) => {
    addProject(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-800 mb-1">
            Project Name
          </label>
          <input
            {...register("name")}
            type="text"
            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project name"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-800 mb-1">
            Project Description
          </label>
          <textarea
            {...register("description")}
            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            placeholder="Enter project description"
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-800 mb-1">
            Project Type
          </label>
          <select
            {...register("type")}
            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select project type</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
          </select>
          {errors.type && (
            <p className="text-red-600 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit">
          Create Project
        </Button>
      </div>
    </form>
  );
};