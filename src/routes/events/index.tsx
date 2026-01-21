import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/')({
  component: EventsPage,
})

function EventsPage() {
  return (
    <div>
      <h1>Events</h1>
    </div>
  )
}
