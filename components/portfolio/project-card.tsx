import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProjectCarousel } from "./project-carousel"
import { projects } from "@/lib/data"

export const ProjectCard = React.memo(function ProjectCard({
    project,
    onImageClick,
}: {
    project: (typeof projects)[0]
    onImageClick: (images: { url: string; alt: string }[], index: number) => void
}) {
    return (
        <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="p-0">
                <div className="p-3 sm:p-4">
                    <ProjectCarousel project={project} onImageClick={onImageClick} />
                </div>

                <div className="px-3 sm:px-4 pb-4 flex flex-col min-h-[200px]">
                    <div className="space-y-0.5 mb-2.5">
                        <h2 className="text-base sm:text-lg font-bold text-foreground">{project.title}</h2>
                        <p className="text-xs font-medium text-brand">{project.tagline}</p>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">{project.description}</p>

                    <div className="flex flex-wrap gap-1 mt-auto">
                        {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0 h-5">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
})
