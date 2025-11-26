import Button from "./Button";

export default function Hero() {
  return (
    <section className="bg-neutral-100 flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col-reverse md:flex-row max-w-[1096px] w-full justify-between items-center gap-10 md:gap-7 sm:gap-20 my-10">

        {/* Text */}
        <div className="flex justify-center md:justify-start">
          <div className="flex flex-col justify-center gap-6 sm:gap-7 items-center sm:items-center md:items-start md:gap-9 lg:gap-13 text-center md:text-left">
            <div className="flex flex-col gap-4">
              <p className="text-gray-800 text-3xl font-semibold font-['Inter']">
                Fresh Arrivals Online
              </p>
              <p className="text-zinc-600 text-sm font-normal font-['Inter']">
                Discover Our Newest Collection Today.
              </p>
            </div>
            <Button text="View Collection" to="/products" />
          </div>
        </div>

        {/* Image */}
        <div className="flex items-center justify-center md:justify-end relative mb-6 md:mb-0">
          <div className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 opacity-60 bg-gray-200 rounded-full" />
          <img
            className="absolute grayscale top-6 -left-2 sm:w-48 md:w-auto"
            src="/images/Burst-pucker.png"
            alt=""
          />
          <img
            className="absolute w-52 sm:w-64 md:w-64 h-72 sm:h-96"
            src="/images/Hero-Image.png"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
