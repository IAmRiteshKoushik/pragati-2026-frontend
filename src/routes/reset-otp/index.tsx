import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reset-otp/')({
  component: ResetOtpPage,
})

function ResetOtpPage() {
  return (
    <div>
      <h1>Reset OTP</h1>
    </div>
  )
}
