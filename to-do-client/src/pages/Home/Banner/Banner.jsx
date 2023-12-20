import PatternDark from "../../../assets/images/pattern-dark.20747baf.svg";

const Banner = () => {
  return (
    <section
      className="md:-mt-20"
      style={{
        background: `url(${PatternDark})`,
      }}
    >
      <div className="hero min-h-screen">
        {/* <div className="hero-overlay bg-opacity-60"></div> */}
        <div className="hero-content text-center ">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-2xl md:text-4xl font-bold">
              Empower Your Productivity with Smart Task Management
            </h1>
            <p className="mb-5">
              Boost your productivity with our smart task management solution!
              Prioritize, collaborate seamlessly, and customize workflows
              effortlessly. Stay on top of deadlines with timely reminders and
              gain valuable insights into your work patterns. Empower your
              productivity journey today!
            </p>
            <button className="custom-button active:scale-95">Let&apos;s Explore</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
