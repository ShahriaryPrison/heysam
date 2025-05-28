import { MagicCard } from "@/components/magicui/magic-card";
import { ShineBorder } from "@/components/magicui/shine-border";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
export default function Home() {
  return (
    <section className="flex justify-center items-center w-screen h-screen">
      <Card className="glass text-white relative overflow-hidden max-w-[350px] w-full py-4">
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        <CardHeader>
          <CardTitle className={'text-center'}>Select Your Language</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center gap-6 mt-5">
            <Link
              href="/en"
              className="member-animation border border-white w-24 h-12 flex justify-center items-center rounded-xl"
            >
              English
            </Link>
            <Link
              href="/fa"
              className="member-animation border border-white w-24 h-12 flex justify-center items-center rounded-xl"
            >
              فارسی
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
