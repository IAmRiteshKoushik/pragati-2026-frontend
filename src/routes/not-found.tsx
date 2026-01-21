import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/not-found')({
  component: NotFoundPage,
})

function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  )
}
