type LowerLayoutProps = {
  left: JSX.Element;
  right: JSX.Element;
};

const LowerLayout = ({ left, right }: LowerLayoutProps) => {
  return (
    <div className="grid grid-cols-10 gap-16 px-56 pt-4">
      {left && <div className="col-span-2">{left}</div>}
      {right && <div className="col-span-8">{right}</div>}
    </div>
  );
};

export default LowerLayout;
