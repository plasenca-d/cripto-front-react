import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col bg-slate-100">
      <nav className="px-8 py-4 flex flex-row justify-start">
        <a href="/login">
          <img src="/logo.png" alt="Logo Dashboard" />
        </a>
      </nav>
      <main className="flex flex-col justify-center items-center h-full">
        <div className="overflow-hidden w-3/4 rounded-3xl p-6 md:p-10 max-w-[600px] mx-auto bg-white">
          <p className="text-lg font-semibold mb-4">Sign In</p>
          <p className="text-sm font-semibold">
            Don't have an account?{" "}
            <a href="/sign-up" className="text-xs font-normal">
              Create One Now!
            </a>
          </p>
          <form className="flex flex-col gap-4 mt-8">
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input isRequired type="email" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input isRequired type="password" />
            </FormControl>
            <Button
              mt={4}
              type="submit"
              variant={"solid"}
              onClick={() => {
                navigate("/home");
              }}
            >
              Submit
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
