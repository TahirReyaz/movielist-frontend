type LowerLayoutProps = {
  left: JSX.Element;
  right: JSX.Element;
};

const LowerLayout = ({ left, right }: LowerLayoutProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-16 px-12 md:px-56 pt-12">
      {left && <div className="col-span-8 md:col-span-2">{left}</div>}
      {right && <div className="col-span-8">{right}</div>}
    </div>
  );
};

export default LowerLayout;
