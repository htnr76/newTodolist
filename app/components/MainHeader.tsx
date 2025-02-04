import Image from "next/image";
import check from "../public/check3.png";
import { Button } from "@/TODO/components/ui/button";
import AddTaskPopover from "@/TODO/app/components/addTask/addTaskPopover";
function MainHeader() {
  return (
    <span className="flex justify-between items-center bg-[#0E172A] p-3 border-b-1 border-white border-solid mb-3">
      <div className="rounded flex items-center gap-2">
        <Image src={check} alt="example" width={25} height={25} />
        <h1 className="font-bold text-[#e3e3e3] text-xl">TaskMaster</h1>
      </div>
      <div>
        <AddTaskPopover/>
      </div>
    </span>
  );
}

export default MainHeader;
