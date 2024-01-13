import { FaRegHandPeace } from "react-icons/fa6";
export default function Default() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex gap-4 justify-center items-center">
        <p className="text-[#4361EE] text-4xl font-semibold text-center pt-3 py-4">
          Coming soon
        </p>
        <FaRegHandPeace color="#4361EE" size={100} />
      </div>
    </div>
  );
}
