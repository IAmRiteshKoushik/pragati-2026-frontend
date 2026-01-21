import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mba-fair/')({
  component: MbaFairPage,
})

function MbaFairPage() {
  return (
    <div>
      <h1>MBA Fair</h1>
    </div>
  )
}
