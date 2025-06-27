import React from "react";
import TopBar from "./TopBar";

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <main className="flex-1 p-4">{children}</main>
        </div>
    );
};

export default Layout;
