import {
  CheckCircleIcon,
  FileTextIcon,
  HomeIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { ProjectSelector } from "./ProjectSelector";
import { CreateProjectForm } from "./CreateProjectForm";

export const Dashboard = (): JSX.Element => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Navigation items data
  const mainNavItems = [
    { icon: <HomeIcon className="w-5 h-5" />, label: "Home", active: true },
    {
      icon: <FileTextIcon className="w-5 h-5" />,
      label: "Documents",
      active: false,
    },
  ];

  // Integration items data
  const integrationItems = [
    {
      icon: (
        <img className="w-5 h-5" alt="Procore" src="public/image-180.png" />
      ),
      label: "Procore",
      status: "Syncing",
      loading: true,
    },
    {
      icon: (
        <img className="w-[21px] h-5" alt="Onedrive" src="public/image.png" />
      ),
      label: "Onedrive",
      status: "Synced",
      loading: false,
    },
    {
      icon: (
        <img
          className="w-[21px] h-5"
          alt="Google Drive"
          src="public/image-1.png"
        />
      ),
      label: "Google Drive",
    },
    {
      icon: <img className="w-5 h-5" alt="Slack" src="public/image-182.png" />,
      label: "Slack",
    },
  ];

  return (
    <>
      <div className="flex h-[1024px] items-start bg-white">
        {/* Sidebar */}
        <aside className="flex flex-col w-64 h-full border-r border-[#e2e8f0]">
          {/* Logo */}
          <header className="flex items-center h-[60px] px-4 border-b border-[#e2e8f0]">
            <img
              className="w-[114px] h-[38px] object-cover"
              alt="Logo"
              src="public/image-168.png"
            />
          </header>

          {/* Main Navigation */}
          <nav className="flex flex-col px-2 py-2">
            {/* HomeIcon and Documents */}
            {mainNavItems.map((item, index) => (
              <Button
                key={index}
                variant={item.active ? "secondary" : "ghost"}
                className="justify-start h-11 w-full font-medium"
              >
                {item.icon}
                <span className="ml-2 text-slate-800">{item.label}</span>
              </Button>
            ))}

            {/* Project Selector */}
            <ProjectSelector />
          </nav>

          {/* Integrations */}
          <div className="flex flex-col px-2">
            {integrationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="justify-start h-11 w-full font-medium"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-slate-800">{item.label}</span>
                  </div>
                  {item.status && (
                    <Badge
                      variant="secondary"
                      className="font-detail text-slate-800 h-6"
                    >
                      {item.loading ? (
                        <div className="flex items-center gap-1">
                          <div className="w-[12px] h-3 bg-[url(public/loading.svg)] bg-[100%_100%]" />
                          <span>Syncing</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <CheckCircleIcon className="w-3.5 h-3.5" />
                          <span>Synced</span>
                        </div>
                      )}
                    </Badge>
                  )}
                </div>
              </Button>
            ))}
          </div>

          {/* Profile Section */}
          <div className="mt-auto px-2">
            <Separator className="my-2" />
            <div className="px-2 py-2">
              <div className="font-detail text-slate-800">Profile</div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-md">
              <Avatar className="w-[31px] h-[31px] bg-slate-200">
                <AvatarFallback className="text-slate-900 font-p">
                  CN
                </AvatarFallback>
              </Avatar>
              <span className="font-body-medium text-slate-800">
                Christopher Nolan
              </span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex flex-col flex-1">
          {/* Header */}
          <header className="flex h-[60px] items-center px-4 border-b border-[#e2e8f0]">
            <h1 className="font-medium text-slate-800">Projects</h1>
          </header>

          {/* Content */}
          <section className="flex flex-col gap-3 p-4 border-b border-[#e2e8f0]">
            {/* Create Project Card */}
            <div className="flex items-center gap-4 w-full">
              <Card 
                className="w-[373px] h-[200px] bg-gray-100 border border-dashed border-[#1e293b] cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <CardContent className="flex items-center justify-center h-full p-0">
                  <PlusIcon className="w-[72px] h-[72px]" />
                </CardContent>
              </Card>
            </div>

            {/* Project Description */}
            <div className="flex w-full gap-[15px]">
              <div className="flex flex-col w-[373px] gap-2">
                <h2 className="font-large text-[#0f172a]">
                  Create a new project
                </h2>
                <p className="font-subtle text-slate-500">
                  Sync to procore project management page
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Create Project Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-800">Create Project</h2>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8"
                onClick={() => setIsCreateModalOpen(false)}
              >
                <XIcon className="w-4 h-4" />
              </Button>
            </div>

            <CreateProjectForm onClose={() => setIsCreateModalOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};