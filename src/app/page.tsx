import Typography from "@mui/material/Typography";

import { TiUserAdd } from "react-icons/ti";
import { MdOutlineFollowTheSigns } from "react-icons/md";
import Link from "next/link";
import { getDataFromToken } from "@/helpers/getDatafromToken";

export default async function Home() {
  getDataFromToken;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-10">
      <div
        className=""
        style={{
          height: "100vh",
          width: "100%",
        }}
      >
        <Typography
          variant="h2"
          marginTop={"5rem"}
          sx={{ mb: "2rem" }}
          color={"#eef2f3"}
          textAlign="center"
          className="text-l lg:text-4xl font-bold text-white"
        >
          Welcome to Epenred Payment Portal
        </Typography>
        <div className="flex gap-10 lg:gap-20 flex-col sm:flex-row justify-evenly lg:p-20 ">
          <Link href="/login">
            <div className=" p-5 bg-white/[0.55] rounded-3xl hover:bg-white/[0.15] hover:shadow-2xl focus:bg-white/[0.3]">
              {/* <TiUserAdd color="#eef2f3" className="md:text-9xl " /> */}
              <Typography variant="h4" color={"#eef2f3"} textAlign="center">
                Login
              </Typography>
            </div>
          </Link>
          <div className=" p-5 bg-white/[0.55] rounded-3xl hover:bg-white/[0.15] hover:shadow-2xl">
            {/* <MdOutlineFollowTheSigns color="#eef2f3" className="md:text-9xl" /> */}
            <Typography variant="h4" color={"#eef2f3"} textAlign="center">
              Register
            </Typography>
          </div>
        </div>
      </div>
    </main>
  );
}
