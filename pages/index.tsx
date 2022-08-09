import AppWrapper from "@/components/app/AppWrapper";
import Navbar from "@/components/app/layout/Navbar";
import { useAuthQuery } from "@/generated/generated";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [{ data, fetching }] = useAuthQuery();

  return (
    <AppWrapper>
      <Navbar isAuth={data?.auth !== null} />
    </AppWrapper>
  );
};

export default Home;
