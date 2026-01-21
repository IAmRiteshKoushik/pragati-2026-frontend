import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/otp/')({
  component: OtpPage,
})

function OtpPage() {
  return (
    <div>
      <h1>OTP Verification</h1>
    </div>
  )
}
