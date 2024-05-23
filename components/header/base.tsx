'use client';

import { LogOut, User } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { Button } from '@bigcommerce/components/button';
import {
  NavigationMenu,
  NavigationMenuCollapsed,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuToggle,
} from '@bigcommerce/components/navigation-menu';
import { getStoreSettings } from '~/client/queries/get-store-settings';
import { ExistingResultType } from '~/client/util';
import { Link } from '~/components/link';

import { StoreLogo } from '../store-logo';

type StoreSettings = ExistingResultType<typeof getStoreSettings>;

interface Props {
  cart: React.ReactNode;
  nav: React.ReactNode;
  collapsedNav: React.ReactNode;
  quickSearch: React.ReactNode;
  isLoggedIn: boolean;
  storeSettings: StoreSettings;
}

export const BasePagesHeader = ({
  cart,
  storeSettings,
  nav,
  collapsedNav,
  quickSearch,
  isLoggedIn,
}: Props) => {
  return (
    <header>
      <NavigationMenu className='flex-col lg:gap-2'>
        <div className="flex items-start gap-6 justify-between w-full">
          <NavigationMenuLink asChild className="px-0">
            <Link href="/">
              <StoreLogo settings={storeSettings} />
            </Link>
          </NavigationMenuLink>

          <div className="flex py-3">
            <NavigationMenuList className="items-start">
              <NavigationMenuItem className='hidden md:block'>
                {quickSearch}
              </NavigationMenuItem>

              <NavigationMenuItem className="hidden lg:flex">
                {isLoggedIn ? (
                  <Button
                    className="p-3 text-black hover:bg-transparent"
                    onClick={() => signOut()}
                    type="button"
                    variant="subtle"
                  >
                    <LogOut />
                  </Button>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link aria-label="Login" href="/login">
                      <User />
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link className="relative" href="/cart">
                    {cart}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>

            <NavigationMenuToggle className="ms-2 lg:hidden" />
          </div>

          <NavigationMenuCollapsed>{collapsedNav}</NavigationMenuCollapsed>
        </div>

        <div className='block md:hidden w-full'>
          <NavigationMenuList className="items-start">
            <NavigationMenuItem className='flex-1'>
              {quickSearch}
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>
        
        <div className="flex items-center justify-between w-full pb-2 mb-4 border-b">
          {nav}
        </div>
      </NavigationMenu>
    </header>
  );
};
