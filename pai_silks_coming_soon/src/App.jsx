
import FooterImage from "./assets/svg/footerbgimage.png";
import BackgroundImage from "./assets/svg/backgroundimagenew.jpg";
import HeroFrame from "./assets/svg/heroframe.svg?react";
import HeroImage from "./assets/svg/heroimage1.svg?react";
import Logo from "./assets/svg/logo.svg?react";
// import Logo from "./assets/svg/logo.png";

import "./App.css";

function App() {
  return (
    <>
      <div
        className="h-screen w-full overflow-y-auto hide-scrollbar"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full flex flex-col min-h-screen">
          <div className="w-full flex justify-center items-center">
            <Logo className="w-[10vw] max-h-fit"/>
            {/* <img src={Logo} alt="" className="w-[10vw] max-h-fit"/> */}
          </div>
          <div
            style={{
              backgroundImage: `url(${FooterImage})`, // Use the imported image variable
              backgroundSize: "cover", // The key property for the 'cover' effect
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="w-full py-[2%]"
          >
            <div className="w-full">
              <HeroFrame
                className="w-full max-h-fit"
                style={{ transform: "rotate(180deg)" }}
              />
            </div>
            <div className="w-full flex justify-center items-center mt-[-2%] mb-[-3%]">
              <HeroImage className="w-[90%] max-h-fit" />
            </div>
            <div className="">
              <HeroFrame className="w-full max-h-fit" />
            </div>
          </div>
          <div className="w-full flex flex-col gap-[4vw] py-[5%] justify-center items-center flex-grow">
            <p className="font-semibold text-[5vw] text-[#68232B] px-[5%]">We're Building Something Just For You</p>
            <p className="text-[#68232B] text-[3vw] px-[5%]">
              Fasten your Seat Belts🚀!
            </p>
          </div>
          <div className="bottom-0 w-full">
            <div
              style={{
                backgroundImage: `url(${FooterImage})`, // Use the imported image variable
                backgroundSize: "cover", // The key property for the 'cover' effect
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className=" w-full py-[2%] flex flex-col gap-[1vw] justify-center items-center"
            >
              <p className="text-[2vw] text-white font-semibold mb-[1vw]">
                <u>Contact Us</u>
              </p>
              <p className="text-[2vw] text-white font-semibold">+91 9113089898</p>
              <p className="text-[2vw] text-white font-semibold">
                paisilks@gmail.com
              </p>
              <p className="text-[2vw] text-white font-semibold">
                Vidya Bhavan, Opp. City Bus Stand, Hassan - 573201
              </p>
            </div>
            <div className="w-full p-3 bg-[#551920] flex justify-between items-center text-white text-lg">
              <p className="items-center text-white text-[1vw]">Copyright © 2025 PRASHANTH RADHAKRISHNA. All Rights Reserved</p>
              <p className="items-center text-white text-[1vw]">GST - SHRIDHARA VENKATARAMANA PAI</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
