import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";

export function DashboardHeader() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/");
  };

  return (
    <header className="sticky top-0  flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-4 ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="h-8 w-8 rounded-full overflow-hidden cursor-pointer">
              <Avatar className="h-full w-full rounded-full border border-gray-300 bg-amber-300 text-white">
                <AvatarImage
                  src="/user.png"
                  alt="User"
                  className="h-full w-full object-cover rounded-full"
                />
                <AvatarFallback className="rounded-full">U</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuItem onClick={() => console.log("Profile clicked")}>
              Profile
            </DropdownMenuItem> */}
            <DropdownMenuItem>
              <Button
                className="w-full text-red-600 hover:bg-red-200"
                onClick={handleLogout}
                variant="ghost"
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
