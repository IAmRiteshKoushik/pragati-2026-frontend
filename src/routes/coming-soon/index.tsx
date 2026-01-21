import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/coming-soon/')({
  component: ComingSoonPage,
})

function ComingSoonPage() {
  return (
    <div>
      <h1>Coming Soon</h1>
    </div>
  )
}
