import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { PenTool, Code, FileText, Feather, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/cards/project-card';
import { Project, StudioType } from '@/types/studio';

const studioIcons = {
  text: PenTool,
  code: Code,
  document: FileText,
  creative: Feather,
};

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const handleProjectClick = (project: Project) => {
    // Navigate to studio with project loaded
    window.location.href = `/studio/${project.studioType}?project=${project.id}`;
  };

  const handleNewProject = () => {
    window.location.href = '/studio/text';
  };

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Your Projects
            </h1>
            <p className="text-xl text-gray-600">
              Manage and organize your AI-generated content
            </p>
          </div>
          
          <Button 
            onClick={handleNewProject}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Project
          </Button>
        </motion.div>

        {projects && projects.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  icon={studioIcons[project.studioType as StudioType]}
                  onClick={() => handleProjectClick(project)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No projects yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start creating amazing content with our AI studios. Your projects will appear here.
            </p>
            <Button 
              onClick={handleNewProject}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Project
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
