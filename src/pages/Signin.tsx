import AuthForm from "@/components/forms/AuthForm"

const SignIn = () => {
  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen">
      <AuthForm type="sign-in" />
    </div>
  )
}

export default SignIn