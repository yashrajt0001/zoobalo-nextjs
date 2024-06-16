"use client";

import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <div className="flex">
        <div className="">
          <Button className="mt-10 ml-10 flex items-center justify-center" variant='ghost' size="icon" onClick={openDrawer}>
            {isDrawerOpen ? (
              null
            ) : (
              <Bars3Icon className="h-8 w-8 stroke-2" />
            )}
          </Button>
          <Drawer open={isDrawerOpen} onClose={closeDrawer}>
            <Card
              color="transparent"
              shadow={false}
              className="h-[calc(100vh-2rem)] w-full p-4"
            >
              <List>
                <ListItem>
                  <ListItemPrefix>
                    <InboxIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Inbox
                  <ListItemSuffix>
                    <Chip
                      value="14"
                      size="sm"
                      variant="ghost"
                      color="blue-gray"
                      className="rounded-full"
                    />
                  </ListItemSuffix>
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Profile
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <Cog6ToothIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Settings
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <PowerIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Log Out
                </ListItem>
              </List>
            </Card>
          </Drawer>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
