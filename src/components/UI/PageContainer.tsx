type PageContainerProps = {
  children: JSX.Element;
};

const PageContainer = ({ children }: PageContainerProps) => (
  <div className="pt-4 px-28">{children}</div>
);

export default PageContainer;
