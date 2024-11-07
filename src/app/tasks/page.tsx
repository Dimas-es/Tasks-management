import Tasks from "./tasks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "iTasks - Pelacak Tugas dan Masalah",
  description:
    "Kelola tugas dan lacak masalah dengan iTasks, pelacak tugas dan masalah yang efisien.",
};

export default function TaskPage() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="h-full flex-1 flex-col mb-3 md:flex">
        <Tasks />
      </div>
    </div>
  );
}
