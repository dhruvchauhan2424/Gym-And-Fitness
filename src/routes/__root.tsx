import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

import { reportLovableError } from "../lib/lovable-error-reporting";

import { Cursor } from "@/components/apex/Cursor";
import { Footer } from "@/components/apex/Footer";
import { Nav } from "@/components/apex/Nav";
import { Preloader } from "@/components/apex/Preloader";
import { SmoothScroll } from "@/components/apex/SmoothScroll";

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
          The page you're looking for doesn't exist or has been moved.
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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);

  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, {
      boundary: "tanstack_root_error_component",
    });
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
          Something went wrong on our end. You can try refreshing or head back
          home.
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
        content: "width=device-width, initial-scale=1",
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
        content: "APEX FITNESS — Forge Your Limits",
      },

      {
        property: "og:description",
        content: "A private London performance facility.",
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
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap",
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

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body
        style={{
          fontFamily: '"Manrope", system-ui, sans-serif',
        }}
      >
        {children}

        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

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
