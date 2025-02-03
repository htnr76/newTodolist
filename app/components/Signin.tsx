import { signIn } from "../auth"
 
export function SignIn() {
  return (
    <form className="flex justify-center items-center h-5/6"
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <button type="submit" className="text-white border-1 rounded-xl bg-[#0D2729] p-2 text-4xl">Sign in</button>
    </form>
  )
}