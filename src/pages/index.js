import Link from "next/link";
export default function Home() {
  return (
    <section className="flex justify-center items-center w-screen h-screen">
      <div className="glass rounded-lg flex flex-col p-10 justify-center items-center gap-8 text-white">
        <h4>Select Your Language :</h4>
        <div className="flex justify-center items-center gap-6">
          <Link href="/en" className="member-animation border border-white w-24 h-12 flex justify-center items-center rounded-xl">English</Link>
          <Link href="/fa" className="member-animation border border-white w-24 h-12 flex justify-center items-center rounded-xl">فارسی</Link>
        </div>
      </div>
    </section>
  );
}
