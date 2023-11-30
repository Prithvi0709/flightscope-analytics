import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-7xl px-4 border-2 border-black">
        {children}
      </div>
    </div>
  );
};

export default Layout;
