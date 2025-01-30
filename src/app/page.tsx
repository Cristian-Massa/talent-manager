import { Button } from "@heroui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
}
