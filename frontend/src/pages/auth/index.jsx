import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import victory from "../../assets/victory.svg";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Background from "../../assets/login2.png";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPasswod] = useState("");

  const handleLogin = async () => {};

  const handleSignUp = async () => {};

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center w-full">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <div className="text-4xl sm:text-5xl font-bold md:text-6xl">
                Welcome
              </div>
              <img
                src={victory}
                alt="victory Emoji"
                className="h-[50px] sm:h-[100px]"
              />
            </div>
            <p className="font-medium text-center">
              Fill in details to get started with the best chat app!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="Login">
              <TabsList className="grid grid-cols-2 bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="Login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none  data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 w-full"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="SignUp"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none  data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 w-full"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="mt-10 flex flex-col gap-5" value="Login">
                <Input
                  type="email"
                  placeholder={"Email"}
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder={"Password"}
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className={"rounded-full p-6"} onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="mt-10 flex flex-col gap-5" value="SignUp">
                <Input
                  type="email"
                  placeholder={"Email"}
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder={"Password"}
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder={"Confirm password"}
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPasswod(e.target.value)}
                />
                <Button className={"rounded-full p-6"}>Sign Up</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={Background} alt="background login" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
