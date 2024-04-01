type PageContainerProps = {
  children: JSX.Element;
};

const PageContainer = ({ children }: PageContainerProps) => (
  <div className="pt-4 px-4 md:px-60">{children}</div>
);

export default PageContainer;
