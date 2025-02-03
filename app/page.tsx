

import { auth } from "./auth";
import { SignIn } from "./components/Signin";
import { redirect } from 'next/navigation';
const Home = async () => {
  const session = await auth();
  const user = session?.user;


  return (
    <>
    
    {user?(
      redirect("/home/?user=user")
    ):( 
      <>
      <SignIn/>
      </>
    )}
    </>
  );
};

export default Home;
