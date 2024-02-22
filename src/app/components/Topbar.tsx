import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu";
  import Link from "next/link";
  import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
  
  export function Topbar() {
    return (
      <div className="flex justify-end">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/profile" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-black hover:text-black`}>
                  Profile
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          <div className="ml-4">
          </div>
        </NavigationMenu>
      </div>
    );
  }
  