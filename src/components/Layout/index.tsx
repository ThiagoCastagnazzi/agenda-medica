const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
      flex
      flex-col
      w-[100%]
      ml-auto
      "
    >
      {children}
    </div>
  );
};

export default Layout;
