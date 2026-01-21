import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  component: HomePage,
})

function HomePage() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}
