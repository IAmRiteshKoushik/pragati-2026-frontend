import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/proshow/')({
  component: ProshowPage,
})

function ProshowPage() {
  return (
    <div>
      <h1>Proshow</h1>
    </div>
  )
}
