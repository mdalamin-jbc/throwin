import { Link } from "react-router-dom";
import mail from "../../assets/icons/mail-icon-3.svg";

const CheckMail = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col justify-center items-center">
            <img className="w-[150px]" src={mail} alt="" />
            <h3 className="text-center mt-8 mb-2 font-hiragino font-semibold text-lg">
              Check Email
            </h3>
            <p className="text-center w-[80%] mx-auto">
              Please check your email inbox and click on the provided link to
              activate your account. If you don't recive email,
              <Link className="text-[#5297FF]">Click here to resend</Link>
            </p>
            <Link className="mt-6 text-[#5297FF]" to={"/login"}>
              <button>
                <p>Back to login</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckMail;
