import {
  Bot,
  ChartNoAxesCombined,
  Cloud,
  Code2,
  LayoutDashboard,
  type LucideIcon,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  bot: Bot,
  'chart-no-axes-combined': ChartNoAxesCombined,
  cloud: Cloud,
  'code-2': Code2,
  'layout-dashboard': LayoutDashboard,
}

export const ApplicationIcon = ({ name }: { name: string }) => {
  const Icon = icons[name] ?? LayoutDashboard
  return <Icon aria-hidden="true" className="size-6" />
}
