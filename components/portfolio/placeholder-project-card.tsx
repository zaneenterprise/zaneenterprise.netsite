import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export const PlaceholderProjectCard = React.memo(() => {
    return (
        <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 border-dashed border-2">
            <CardContent className="p-0">
                <div className="p-3 sm:p-4">
                    <div className="relative aspect-[9/16] sm:aspect-[3/4] rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                        <Sparkles className="h-12 w-12 sm:h-16 sm:w-16 text-brand/30" />
                    </div>
                </div>

                <div className="px-3 sm:px-4 pb-4 flex flex-col min-h-[200px]">
                    <div className="space-y-0.5 mb-2.5">
                        <h2 className="text-base sm:text-lg font-bold text-foreground">Your Project Here</h2>
                        <p className="text-xs font-medium text-brand">This Could Be Your Next Project</p>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">
                        Ready to bring your ideas to life? Let's collaborate on creating something amazing that stands out.
                    </p>

                    <div className="flex flex-wrap gap-1 mt-auto">
                        <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
                            Custom
                        </Badge>
                        <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
                            Innovative
                        </Badge>
                        <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
                            Modern
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
})

PlaceholderProjectCard.displayName = 'PlaceholderProjectCard'
