import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sponsors/')({
  component: SponsorsPage,
})

function SponsorsPage() {
  return (
    <div>
      <h1>Sponsors</h1>
    </div>
  )
}
