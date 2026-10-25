"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Tab,
  Tabs,
  User,
  useDisclosure,
} from "@nextui-org/react";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { HiHomeModern } from "react-icons/hi2";
import { RxAvatar } from "react-icons/rx";
import { IoMdHome } from "react-icons/io";
import { TbHomeSearch } from "react-icons/tb";
import { GrServices } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { signIn, signOut, useSession } from "next-auth/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";
import { FcGoogle } from "react-icons/fc";

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState("login");
  const [signInLoading, setSignInLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hashedUrl, setHashedUrl] = useState("");
  const pathname = usePathname() ?? "/";
  const url = pathname + (hashedUrl || "");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const session = useSession();
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");
  const router = useRouter();
  const isLoggedIn = Boolean(session.data?.user);

  useEffect(() => {
    if (searchParams?.get("code") || searchParams?.get("state")) {
      router.replace(pathname);
    }
  }, [pathname, router, searchParams]);

  const isInvalid = useMemo(() => {
    if (email === "") return false;
    return !EMAIL_PATTERN.test(email);
  }, [email]);

  useEffect(() => {
    setHashedUrl(window.location.hash);

    const handleHashChange = () => {
      setHashedUrl(window.location.hash || "");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (!error) return;
    onOpen();
    setSignInLoading(false);
    setErrorMessage(error);
  }, [error, onOpen]);

  async function signInWithGoogle() {
    const result = await signIn("google");
    if (result?.ok) redirect("/");
  }

  async function loginWithCredentials() {
    if (!email || password.length < 8) return;

    setSignInLoading(true);
    setErrorMessage("");

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (loginError) {
      console.error(loginError);
      setErrorMessage("Invalid login details");
      setSignInLoading(false);
    }
  }

  async function signupWithCredentials() {
    if (!email || password.length < 8) return;

    setSignInLoading(true);
    setErrorMessage("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (signupError) {
      console.error(signupError);
      setErrorMessage("Could not create an account with those details");
      setSignInLoading(false);
    }
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="xl"
        isBlurred={false}
        className="top-[0] fixed w-full bg-[#fafaff]"
        classNames={{
          wrapper: "sm:px-6 px-3",
        }}
      >
        <NavbarContent>
          <NavbarBrand className="flex gap-3">
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
            <Tab key="/" title="Home" href="/" />
            <Tab key="/#about-us" title="About" href="/#about-us" />
            <Tab key="/Listings" title="Listings and Offers" href="/Listings" />
            <Tab key="/#services" title="Services" href="/#services" />
            <Tab key="/#blogs" title="Blogs" href="/#blogs" />
          </Tabs>
        </NavbarContent>

        <NavbarContent justify="end" className="hidden sm:flex">
          {isLoggedIn ? (
            <Dropdown>
              <DropdownTrigger className="cursor-pointer">
                <User
                  avatarProps={{
                    src: `${session.data?.user?.image ?? ""}`,
                  }}
                  name={session.data?.user?.name}
                  description={session.data?.user?.email}
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="account">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{session.data?.user?.email}</p>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={() => {
                    signOut({ redirect: false });
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
              className="bg-[#0070f0] flex justify-center items-center text-white"
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
            href="/#about-us"
            onClick={closeMenu}
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
            href="/Listings"
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
            href="/#services"
            onClick={closeMenu}
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
            href="/#blogs"
            onClick={closeMenu}
          >
            <IoBookSharp
              color={url === "/#blogs" ? "#0070f0" : "black"}
              size={24}
            />
            <p className="text-xl">Blogs</p>
          </NavbarItem>

          <NavbarItem className="sm:hidden flex flex-col gap-3 justify-start">
            {isLoggedIn ? (
              <User
                className="justify-start"
                classNames={{
                  base: "justify-start",
                }}
                avatarProps={{
                  src: `${session.data?.user?.image ?? ""}`,
                }}
                name={session.data?.user?.name}
                description={session.data?.user?.email}
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
          {isLoggedIn && (
            <Button
              className="text-xl text-white bg-danger max-w-[200px] flex justify-center items-center"
              onClick={() => {
                signOut({ redirect: false });
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
          {() => (
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
                <Card className="min-h-[400px] h-fit shadow-none" shadow="none">
                  <CardBody className="overflow-hidden">
                    <Tabs
                      fullWidth
                      size="md"
                      aria-label="Tabs form"
                      selectedKey={selected}
                      onSelectionChange={(key) => setSelected(String(key))}
                    >
                      <Tab key="login" title="Login">
                        <form
                          className="flex flex-col gap-4"
                          onSubmit={(event) => {
                            event.preventDefault();
                            void loginWithCredentials();
                          }}
                        >
                          <Input
                            isRequired
                            label="Email"
                            id="email"
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            isInvalid={isInvalid}
                            errorMessage={
                              isInvalid ? "Please enter a valid email" : ""
                            }
                          />
                          <Input
                            isRequired
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            id="password"
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                            errorMessage={
                              password.length > 1 && password.length < 8
                                ? "Password needs to be at least 8 characters long"
                                : ""
                            }
                          />
                          {errorMessage && (
                            <p className="text-danger font-medium">
                              {errorMessage}
                            </p>
                          )}
                          <p className="text-center text-small">
                            Need to create an account?{" "}
                            <Link
                              size="sm"
                              onPress={() => {
                                setErrorMessage("");
                                setSelected("sign-up");
                              }}
                              className="cursor-pointer"
                            >
                              Sign up
                            </Link>
                          </p>
                          <div className="flex gap-2 justify-end">
                            <Button
                              fullWidth
                              color="primary"
                              type="submit"
                              className="rounded-sm h-[45px]"
                              isLoading={signInLoading}
                              isDisabled={signInLoading}
                            >
                              Login
                            </Button>
                          </div>
                          <div className="flex justify-center">
                            <Button
                              fullWidth
                              className="bg-white max-w-[200px] shadow-md mx-auto h-[45px] rounded-sm"
                              onClick={() => {
                                void signInWithGoogle();
                              }}
                              startContent={<FcGoogle size={30} />}
                            >
                              Login with Google
                            </Button>
                          </div>
                        </form>
                      </Tab>
                      <Tab key="sign-up" title="Sign up">
                        <form
                          className="flex flex-col gap-4 min-h-[300px]"
                          onSubmit={(event) => {
                            event.preventDefault();
                            void signupWithCredentials();
                          }}
                        >
                          <Input
                            isRequired
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                          <Input
                            isRequired
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                          />
                          {errorMessage && (
                            <p className="text-danger font-medium">
                              {errorMessage}
                            </p>
                          )}
                          <p className="text-center text-small">
                            Already have an account?{" "}
                            <Link
                              size="sm"
                              onPress={() => {
                                setErrorMessage("");
                                setSelected("login");
                              }}
                              className="cursor-pointer"
                            >
                              Login
                            </Link>
                          </p>
                          <div className="flex gap-2 justify-end">
                            <Button
                              fullWidth
                              color="primary"
                              type="submit"
                              className="rounded-sm h-[45px]"
                              isLoading={signInLoading}
                              isDisabled={signInLoading}
                            >
                              Sign up
                            </Button>
                          </div>
                          <div className="flex justify-center">
                            <Button
                              fullWidth
                              className="bg-white max-w-[200px] shadow-md mx-auto h-[45px] rounded-sm"
                              onClick={() => {
                                void signInWithGoogle();
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
