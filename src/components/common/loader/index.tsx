const Loader = () => {
  return (
    <>
      <style>
        {`
          @keyframes rotation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <span
        className="w-12 h-12 border-[5px] border-white border-b-[var(--dark-amber)] rounded-full inline-block box-border"
        style={{ animation: "rotation 1s linear infinite" }}
      ></span>
    </>
  );
};

export default Loader;
