import { createFileRoute } from '@tanstack/react-router'
import SignUpFormDesktop from '../../components/auth/SignUpFormDesktop'
import SignUpFormMobile from '../../components/auth/SignUpFormMobile'
import { useSignUp } from '../../hooks/useSignUp'

export const Route = createFileRoute("/signup/")({
	component: SignupPage,
});

function SignupPage() {
  const { mutate: signUp, isPending } = useSignUp()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>
      <SignUpFormDesktop onSubmit={signUp} isSubmitting={isPending} />
      <SignUpFormMobile onSubmit={signUp} isSubmitting={isPending} />
    </div>
  )
}
