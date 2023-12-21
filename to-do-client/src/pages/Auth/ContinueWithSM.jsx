import { FaGoogle, FaFacebook, FaXTwitter } from "react-icons/fa6";
const ContinueWithSM = () => {
  return (
    <>
      <div className="py-2">
        <div className="divider text-sm">Login With</div>
        <div className="text-center flex justify-center gap-4">
          <span className="btn bg-blue-500 text-white hover:bg-blue-500 hover:text-white text-xl btn-sm">
            <FaGoogle />
          </span>
          <span className="btn bg-blue-500 text-white hover:bg-blue-500 hover:text-white  text-xl btn-sm">
            <FaFacebook />
          </span>
          <span className="btn bg-blue-500 text-white hover:bg-blue-500 hover:text-white  text-xl btn-sm">
            <FaXTwitter />
          </span>
        </div>
      </div>
    </>
  );
};

export default ContinueWithSM;
