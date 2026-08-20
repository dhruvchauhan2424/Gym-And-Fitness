import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";


// ----------------------------------------------------
// PRELOADER
// ----------------------------------------------------

function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "#fff",
        transition: "opacity 0.5s ease",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Apex Fitness
      </div>
    </div>
  );
}


// ----------------------------------------------------
// CUSTOM CURSOR
// ----------------------------------------------------

function Cursor() {
  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        background: "currentColor",
        color: "#ffffff",
        pointerEvents: "none",
        zIndex: 99998,
        transform: "translate(-50%, -50%)",
        mixBlendMode: "difference",
        transition:
          "left 0.08s ease-out, top 0.08s ease-out",
      }}
    />
  );
}


// ----------------------------------------------------
// SMOOTH SCROLL
// ----------------------------------------------------

function SmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      const link = target?.closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;

      if (!link) return;

      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const element = document.querySelector(href);

      if (!element) return;

      event.preventDefault();

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    document.addEventListener(
      "click",
      handleAnchorClick
    );

    return () => {
      document.removeEventListener(
        "click",
        handleAnchorClick
      );
    };
  }, []);

  return null;
}


// ----------------------------------------------------
// NAVIGATION
// ----------------------------------------------------

function Nav() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "20px 24px",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
          borderRadius: "999px",
          background: "rgba(10, 10, 10, 0.75)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          APEX
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <a
            href="#about"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "13px",
            }}
          >
            About
          </a>

          <a
            href="#services"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "13px",
            }}
          >
            Services
          </a>

          <a
            href="#contact"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "13px",
            }}
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}


// ----------------------------------------------------
// FOOTER
// ----------------------------------------------------

function Footer() {
  return (
    <footer
      style={{
        padding: "60px 24px 30px",
        background: "#0a0a0a",
        color: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            fontSize: "32px",
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          APEX FITNESS
        </div>

        <p
          style={{
            margin: 0,
            maxWidth: "500px",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7,
          }}
        >
          A private strength and performance facility
          built for people who refuse to settle.
        </p>

        <div
          style={{
            marginTop: "30px",
            paddingTop: "20px",
            borderTop:
              "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.45)",
            fontSize: "12px",
          }}
        >
          © {new Date().getFullYear()} Apex Fitness.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}


// ----------------------------------------------------
// 404 PAGE
// ----------------------------------------------------

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1
          className="
            text-5xl
            font-medium
            tracking-[-0.04em]
            text-foreground
          "
        >
          404
        </h1>

        <h2
          className="
            mt-4
            text-lg
            font-medium
            tracking-[-0.02em]
            text-foreground
          "
        >
          Page not found
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The page you're looking for doesn't exist or
          has been moved.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="
              inline-flex
              items-center
              justify-center
              rounded-full
              bg-primary
              px-5
              py-2.5
              text-xs
              font-medium
              tracking-wide
              text-primary-foreground
              transition-colors
              hover:bg-primary/90
            "
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}


// ----------------------------------------------------
// ERROR PAGE
// ----------------------------------------------------

function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);

  const router = useRouter();

  useEffect(() => {
    console.error(
      "Apex application error:",
      error
    );
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1
          className="
            text-lg
            font-medium
            tracking-tight
            text-foreground
          "
        >
          This page didn't load
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Something went wrong on our end. You can try
          refreshing or head back home.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="
              inline-flex
              items-center
              justify-center
              rounded-full
              bg-primary
              px-5
              py-2.5
              text-xs
              font-medium
              text-primary-foreground
              transition-colors
              hover:bg-primary/90
            "
          >
            Try again
          </button>

          <a
            href="/"
            className="
              inline-flex
              items-center
              justify-center
              rounded-full
              border
              border-input
              bg-background
              px-5
              py-2.5
              text-xs
              font-medium
              text-foreground
              transition-colors
              hover:bg-accent
            "
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}


// ----------------------------------------------------
// ROOT ROUTE
// ----------------------------------------------------

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },

      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1",
      },

      {
        title: "APEX FITNESS — Forge Your Limits",
      },

      {
        name: "description",
        content:
          "A private strength and performance facility in Shoreditch, London.",
      },

      {
        name: "author",
        content: "Apex Fitness",
      },

      {
        name: "theme-color",
        content: "#0a0a0a",
      },

      {
        property: "og:title",
        content:
          "APEX FITNESS — Forge Your Limits",
      },

      {
        property: "og:description",
        content:
          "A private London performance facility.",
      },

      {
        property: "og:site_name",
        content: "Apex Fitness",
      },

      {
        property: "og:type",
        content: "website",
      },

      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],

    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },

      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },

      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap",
      },

      {
        rel: "stylesheet",
        href: appCss,
      },

      {
        rel: "icon",
        href: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
  }),

  shellComponent: RootShell,

  component: RootComponent,

  notFoundComponent: NotFoundComponent,

  errorComponent: ErrorComponent,
});


// ----------------------------------------------------
// HTML SHELL
// ----------------------------------------------------

function RootShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body
        style={{
          fontFamily:
            '"Manrope", system-ui, sans-serif',
          margin: 0,
        }}
      >
        {children}

        <Scripts />
      </body>
    </html>
  );
}


// ----------------------------------------------------
// ROOT COMPONENT
// ----------------------------------------------------

function RootComponent() {
  const { queryClient } =
    Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Preloader />

      <SmoothScroll />

      <Cursor />

      <Nav />

      <main
        className="
          grain
          min-h-screen
          overflow-x-clip
          bg-background
        "
      >
        <Outlet />
      </main>

      <Footer />
    </QueryClientProvider>
  );
}
