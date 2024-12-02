// app/tabs/page.tsx
"use client";
import React, { useCallback, useEffect } from "react";
import {
  Card,
  CardBody,
  Tab,
  Tabs,
  Navbar,
  NavbarMenuToggle,
  NavbarContent,
  NavbarBrand,
  NavbarMenu,
  NavbarItem,
  Link,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  CardHeader,
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { HiHomeModern } from "react-icons/hi2";
import { RxAvatar } from "react-icons/rx";
import { TbHomePlus } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { TbHomeSearch } from "react-icons/tb";
import { GrServices } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import {
  getProviders,
  getCsrfToken,
  signIn,
  useSession,
  signOut,
} from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { FcGoogle } from "react-icons/fc";
export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState<any>("login");
  const pathname = usePathname();
  const [providers, setProviders] = useState<any>([]);
  const [signInloading, setSignInLoading] = useState<any>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const session = useSession();
  const hashUrl = typeof window !== "undefined" && window.location.hash;
  const [hashedUrl, setHashedUrl] = useState("");
  const url = pathname + (hashedUrl || "");
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  //check if email is valid
  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  // Update hash URL only on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set the initial hash if it exists
      setHashedUrl(window.location.hash);

      // Listen for hash changes
      const handleHashChange = () => {
        setHashedUrl(window.location.hash || "");
      };

      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);

  useEffect(() => {
    if (error) {
      onOpen();
      setSignInLoading(false);
      setErrorMessage(error);
    }
  }, [error]);

  return (
    <div>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="xl"
        isBlurred={false}
        className="top-[0] fixed w-full bg-[#fafaff] "
        classNames={{
          wrapper: "sm:px-6 px-3",
        }}
      >
        <NavbarContent className="">
          <NavbarBrand className="flex gap-3 ">
            <Link href="/" className="flex justify-center items-center gap-2">
              <div className="rounded-[50%] bg-[#0070f0] p-1">
                <HiHomeModern size={30} color="white" />
              </div>
              <p className="font-bold text-inherit text-lg sm:text-2xl">
                RealSwitch
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="text-black hidden lg:flex">
          <Tabs
            aria-label="Options"
            selectedKey={url}
            variant="light"
            color="primary"
            radius="full"
            className="text-black"
          >
            <Tab key="/" title="Home" href="/"></Tab>
            <Tab key="/#about-us" title="About" href="/#about-us"></Tab>
            <Tab
              key="/Listings"
              title="Listings and Offers"
              href="/Listings"
            ></Tab>
            <Tab key="/#services" title="Services" href="/#services"></Tab>
            <Tab key="/#blogs" title="Blogs" href="/#blogs"></Tab>
          </Tabs>
        </NavbarContent>

        <NavbarContent justify="end" className="hidden sm:flex">
          {session.data?.user ? (
            <Dropdown>
              <DropdownTrigger className="cursor-pointer">
                <User
                  avatarProps={{
                    src: `${session.data.user.image}`,
                  }}
                  name={session?.data?.user.name}
                  description={session?.data?.user.email}
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{session?.data?.user.email}</p>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={() => {
                    signOut();
                  }}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              onPress={onOpen}
              radius="full"
              className="bg-[#0070f0]  flex justify-center items-center text-white"
            >
              <RxAvatar size={20} />
              <p className="text-base">Login/Register</p>
            </Button>
          )}
        </NavbarContent>
        <NavbarMenu className="flex flex-col gap-3">
          <NavbarItem
            className={`flex justify-start items-center gap-3 py-2 ${
              url === "/" ? "text-[#0070f0]" : "text-black"
            }`}
            as={Link}
            key="home"
            href="/"
            aria-label="dashboard"
          >
            <IoMdHome color={url === "/" ? "#0070f0" : "black"} size={24} />
            <p className="text-xl">Home</p>
          </NavbarItem>
          <NavbarItem
            className={`flex justify-start items-center gap-3 py-2 ${
              url === "/#about-us" ? "text-[#0070f0]" : "text-black"
            }`}
            as={Link}
            href={"/#about-us"}
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <IoMdInformationCircleOutline
              color={url === "/#about-us" ? "#0070f0" : "black"}
              size={24}
            />
            <p className="text-xl">About</p>
          </NavbarItem>
          <NavbarItem
            className={`flex justify-start items-center gap-3 py-2 ${
              url?.includes("/Listings") ? "text-[#0070f0]" : "text-black"
            }`}
            as={Link}
            href={"/Listings"}
          >
            <TbHomeSearch
              color={url?.includes("/Listings") ? "#0070f0" : "black"}
              size={24}
            />
            <p className="text-xl">Listings and Offers</p>
          </NavbarItem>
          <NavbarItem
            className={`flex justify-start items-center gap-3 py-2 ${
              url === "/#services" ? "text-[#0070f0]" : "text-black"
            }`}
            as={Link}
            href={"/#services"}
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <GrServices
              color={url === "/#services" ? "#0070f0" : "black"}
              size={24}
            />
            <p className="text-xl">Services</p>
          </NavbarItem>
          <NavbarItem
            className={`flex justify-start items-center gap-3 py-2 ${
              url === "/#blogs" ? "text-[#0070f0]" : "text-black"
            }`}
            as={Link}
            href={"/#blogs"}
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <IoBookSharp
              color={url === "/#blogs" ? "#0070f0" : "black"}
              size={24}
            />
            <p className="text-xl">Blogs</p>
          </NavbarItem>

          <NavbarItem className="sm:hidden flex flex-col gap-3 justify-start">
            {session?.data?.user ? (
              <User
                className="justify-start"
                classNames={{
                  base: "justify-start",
                }}
                avatarProps={{
                  src: `${session.data?.user?.image}`,
                }}
                name={session?.data?.user.name}
                description={session?.data?.user.email}
              />
            ) : (
              <Button
                onPress={onOpen}
                radius="full"
                className="bg-[#0070f0] max-w-[200px] flex justify-center items-center text-white"
              >
                <CiLogin size={24} color="white" />
                <p className="text-base">Login/Register</p>
              </Button>
            )}
          </NavbarItem>
          {session.data !== null && (
            <Button
              className="text-xl text-white bg-danger max-w-[200px] flex justify-center items-center"
              onClick={() => {
                signOut();
              }}
              endContent={<CiLogin size={24} color="white" />}
            >
              Logout
            </Button>
          )}
        </NavbarMenu>

        <NavbarContent
          className="lg:hidden flex-[0] flex-grow-[0.3]"
          style={{
            flexGrow: "0.1",
          }}
          justify="start"
        >
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>
      </Navbar>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex justify-start items-center gap-2 text-[#0070f0]">
                  <div className="rounded-[50%] bg-[#0070f0] p-1">
                    <HiHomeModern size={30} color="white" />
                  </div>
                  <p className="font-bold text-inherit text-lg sm:text-2xl text-[#0070f0]">
                    RealSwitch
                  </p>
                </div>
              </ModalHeader>
              <ModalBody>
                <Card
                  className=" min-h-[400px] h-fit  shadow-none"
                  shadow="none"
                >
                  <CardBody className="overflow-hidden">
                    <Tabs
                      fullWidth
                      size="md"
                      aria-label="Tabs form"
                      selectedKey={selected}
                      onSelectionChange={setSelected}
                    >
                      <Tab key="login" title="Login">
                        <form
                          className="flex flex-col gap-4"
                          method="post"
                          action="/api/auth/"
                        >
                          <Input
                            isRequired
                            label="Email"
                            id="email"
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            isInvalid={isInvalid}
                            errorMessage={
                              isInvalid ? "Please enter a valid email" : ""
                            }
                          />
                          <div>
                            <Input
                              isRequired
                              label="Password"
                              placeholder="Enter your password"
                              type="password"
                              value={password}
                              id="password"
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                              errorMessage={
                                password.length > 1 && password.length < 8
                                  ? " password nedds to be ad least 8 characters long"
                                  : ""
                              }
                            />
                          </div>
                          {errorMessage && (
                            <p className="text-danger font-medium">
                              {errorMessage}
                            </p>
                          )}
                          <p className="text-center text-small">
                            Need to create an account?{" "}
                            <Link
                              size="sm"
                              onPress={() => setSelected("sign-up")}
                              className="cursor-pointer"
                            >
                              Sign up
                            </Link>
                          </p>
                          <div className="flex gap-2 justify-end">
                            <Button
                              fullWidth
                              color="primary"
                              onClick={() => {
                                if (email && password.length >= 8) {
                                  setSignInLoading(true);
                                  signIn("credentials", {
                                    email,
                                    password,
                                    redirect: true,
                                    callbackUrl: "/",
                                  });
                                }
                              }}
                              className="rounded-sm h-[45px]"
                              isLoading={signInloading}
                              isDisabled={signInloading}
                            >
                              Login
                            </Button>
                          </div>

                          <div className="flex justify-center">
                            <Button
                              fullWidth
                              className="bg-white max-w-[200px] shadow-md  mx-auto h-[45px] rounded-sm "
                              onClick={() => {
                                signIn("google", {
                                  redirect: true,
                                  callbackUrl: "/",
                                }).then(() => {
                                  redirect("/");
                                });
                                // signUserIn();
                              }}
                              startContent={<FcGoogle size={30} />}
                            >
                              Login with Google
                            </Button>
                          </div>
                        </form>
                      </Tab>
                      <Tab key="sign-up" title="Sign up">
                        <form className="flex flex-col gap-4 h-[300px]">
                          <Input
                            isRequired
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                          <Input
                            isRequired
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                          <p className="text-center text-small">
                            Already have an account?{" "}
                            <Link
                              size="sm"
                              onPress={() => setSelected("login")}
                              className="cursor-pointer"
                            >
                              Login
                            </Link>
                          </p>
                          <div className="flex gap-2 justify-end">
                            <Button
                              fullWidth
                              color="primary"
                              onClick={() => {
                                if (email && password.length >= 8) {
                                  setSignInLoading(true);
                                  createUserWithEmailAndPassword(
                                    auth,
                                    email,
                                    password
                                  );
                                  signIn("credentials", {
                                    email,
                                    password,
                                    redirect: true,
                                    callbackUrl: "/",
                                  });
                                }
                              }}
                              className="rounded-sm h-[45px]"
                              isLoading={signInloading}
                              isDisabled={signInloading}
                            >
                              Sign up
                            </Button>
                          </div>
                          <div className="flex justify-center">
                            <Button
                              fullWidth
                              className="bg-white max-w-[200px] shadow-md  mx-auto h-[45px] rounded-sm "
                              onClick={() => {
                                signIn("google", {
                                  redirect: true,
                                  callbackUrl: "/",
                                }).then(() => {
                                  redirect("/");
                                });
                              }}
                              startContent={<FcGoogle size={30} />}
                            >
                              Sign up with Google
                            </Button>
                          </div>
                        </form>
                      </Tab>
                    </Tabs>
                  </CardBody>
                </Card>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
