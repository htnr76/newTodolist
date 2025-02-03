import Image from "next/image";
import check from "../public/check3.png";
function MainHeader() {
  return (
    <span className="flex bg-[#0E172A] p-3 border-b-1 border-white border-solid mb-3">
      <div className="rounded flex">
        <Image src={check} alt="example" width={25} height={25} />
        <h1 className="font-bold text-[#e3e3e3] text-xl">TaskMaster</h1>
      </div>
    </span>
  );
}

export default MainHeader;
