"use client";
import {
  CodeIcon,
  StackIcon,
  LockClosedIcon,
  LayersIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";

let notifications = [
  {
    name: "Restful APIs",
    description:"",
    icon: <CodeIcon/>,
    color: "#00C9A7",
  },
  {
    name: "Database Management",
    description:
    "",
    icon: <StackIcon/>,
    color: "#FFB800",
  },
  {
    name: "Authentication Systems",
    description:"",
    icon: <LockClosedIcon/>,
    color: "#FF3D71",
  },
  {
    name: "Microservices & Internal APIs",
    description:"",
    icon: <LayersIcon/>,
    color: "#1E86FF",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({ className }) {
  return (
    <div
      className={cn(
        "relative flex h-[200px] w-full flex-col overflow-hidden p-4",
        className
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#1f1d2b]"></div>
    </div>
  );
}
