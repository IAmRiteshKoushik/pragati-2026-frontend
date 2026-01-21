import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/brochure/')({
  component: BrochurePage,
})

function BrochurePage() {
  return (
    <div>
      <h1>Brochure</h1>
    </div>
  )
}
