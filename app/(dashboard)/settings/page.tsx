import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { currentUser } from "@/lib/user"

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <Card className="dashboard-card border border-border/60">
        <CardHeader className="pb-0">
          <CardTitle className="dashboard-section-title">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {currentUser.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{currentUser.fullName}</p>
              <p className="text-sm text-muted-foreground">{currentUser.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="dashboard-card border border-border/60">
        <CardHeader className="pb-0">
          <CardTitle className="dashboard-section-title">Learning Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Weekly goal: 5 focused learning days</p>
          <p>Reminders: live classes, assignments, and revision checkpoints</p>
          <p>Theme: follows the current Lumina LMS dashboard toggle</p>
        </CardContent>
      </Card>
    </div>
  )
}
