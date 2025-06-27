import { Home, User } from "lucide-react";

const TopBar = () => {
    return (
        <header className="w-full bg-blue-600 text-white px-4 py-3 shadow-md flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer">
                <Home className="w-6 h-6" />
            </div>

            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center cursor-pointer">
                <User className="w-5 h-5 text-blue-600" />
            </div>
        </header>
    );
};

export default TopBar;
