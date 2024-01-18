type LowerLayoutProps = {
  left: JSX.Element;
  right: JSX.Element;
};

const LowerLayout = ({ left, right }: LowerLayoutProps) => {
  return (
    <div className="flex px-40 pt-4">
      {left && <div className="w-1/5">{left}</div>}
      {right && <div className="w-4/5">{right}</div>}
    </div>
  );
};

export default LowerLayout;
