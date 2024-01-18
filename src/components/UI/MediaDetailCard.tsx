type Props = {
  children: JSX.Element;
  classes?: string;
};

const MediaDetailCard = ({ children, classes }: Props) => (
  <div className={"p-2 mt-4 bg-bgSecondary rounded " + classes}>{children}</div>
);

export default MediaDetailCard;
