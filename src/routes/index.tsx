import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BeforeAfter } from "@/components/apex/BeforeAfter";
import { MagneticLink } from "@/components/apex/MagneticButton";
import { Marquee } from "@/components/apex/Marquee";
import { Reveal, SplitText } from "@/components/apex/Reveal";

import {
  FinalCTA,
  MembershipGrid,
  StatsBand,
  Testimonials,
} from "@/components/apex/Sections";

import { FacilityScroller } from "./facilities";
import { ProgramList } from "./programs";

import { TiltCard } from "@/components/apex/TiltCard";

import { ensureGsap } from "@/lib/gsap";

import { images, marqueeWords, trainers } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "APEX FITNESS — Forge Your Limits | London Performance Gym",
      },

      {
        name: "description",
        content:
          "Apex Fitness is a private strength and performance facility in Shoreditch, London. Lab-tested programming, elite coaching and a full recovery wing.",
      },

      {
        property: "og:title",
        content: "APEX FITNESS — Forge Your Limits",
      },

      {
        property: "og:description",
        content:
          "A private London performance facility. Lab-tested programming, elite coaching, full recovery wing.",
      },
    ],
  }),

  component: Index,
});

function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // 1. Get the image URLs
    const frameUrls = import.meta.glob(
      "@/assets/ezgif-32c9e2cfa18ab8bc-jpg/*.png",
      { eager: true, query: "?url", import: "default" },
    ) as Record<string, string>;
    const sortedUrls = Object.values(frameUrls).sort((a, b) => {
      const numA = parseInt(a.match(/(\d+)/)?.[0] || "0", 10);
      const numB = parseInt(b.match(/(\d+)/)?.[0] || "0", 10);
      return numA - numB;
    });

    // 2. Preload the images
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    sortedUrls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === sortedUrls.length) {
          setImagesPreloaded(true);
        }
      };
      // Important to push in order
      imgArray[i] = img;
    });

    imagesRef.current = imgArray;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (
      !container ||
      !canvas ||
      !imagesPreloaded ||
      imagesRef.current.length === 0
    )
      return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const images = imagesRef.current;
    const totalFrames = images.length;

    // Set initial canvas size and draw first frame
    const context = canvas.getContext("2d");
    if (!context) return;

    const renderFrame = (index: number) => {
      if (!context || !images[index]) return;
      const img = images[index];

      // Cover logic like background-size: cover
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio,
      );
    };

    const updateCanvasSize = () => {
      // maintain the image aspect ratio or cover
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Re-render the current frame (or frame 0 if not yet animating)
      // Since it's resize, we'll just render frame 0 for now
      renderFrame(0);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Create GSAP context
    const ctx = gsap.context(() => {
      // Intro Text Animation (subtle reveal)
      gsap.fromTo(
        "[data-hero-fade]",
        { autoAlpha: 0, y: 20, filter: "blur(10px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out",
        },
      );

      // ScrollTrigger for Canvas Sequence
      const frameConfig = { frame: 0 };

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(self.progress * totalFrames),
          );
          if (frameConfig.frame !== frameIndex) {
            frameConfig.frame = frameIndex;
            // Use requestAnimationFrame for smooth drawing
            requestAnimationFrame(() => renderFrame(frameIndex));
          }
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=300%",
          scrub: true,
        },
      });

      // 0-33%: Fade out hero content
      tl.to("[data-hero-content]", {
        autoAlpha: 0,
        y: -40,
        filter: "blur(8px)",
        duration: 1,
      })
      // 33-50%: Show Text 1
      .fromTo(
        '[data-scroll-text="1"]',
        { autoAlpha: 0, y: 40, filter: "blur(8px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.5 }
      )
      // 50-66%: Hide Text 1
      .to('[data-scroll-text="1"]', {
        autoAlpha: 0,
        y: -40,
        filter: "blur(8px)",
        duration: 0.5,
      })
      // 66-83%: Show Text 2
      .fromTo(
        '[data-scroll-text="2"]',
        { autoAlpha: 0, y: 40, filter: "blur(8px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.5 }
      )
      // 83-100%: Hide Text 2
      .to('[data-scroll-text="2"]', {
        autoAlpha: 0,
        y: -40,
        filter: "blur(8px)",
        duration: 0.5,
      });
    }, container);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [imagesPreloaded]);

  return (
    <section
      ref={containerRef}
      className="
        relative
        h-svh
        min-h-[620px]
        w-full
        overflow-hidden
        bg-background
      "
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full object-cover"
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-background/70
          via-background/30
          to-background/80
        "
      />

      {/* Additional scroll-driven content */}
      <div
        className="
          absolute
          inset-0
          z-10
          flex
          flex-col
          items-center
          justify-center
          pointer-events-none
          px-6
          text-center
          md:px-10
        "
      >
        <div data-scroll-text="1" className="absolute w-full max-w-2xl opacity-0 translate-y-10 blur-md">
          <h2 className="font-[Manrope] text-4xl md:text-6xl font-medium leading-[1.1] tracking-[-0.04em] text-foreground">
            Gym & Fitness
          </h2>
          <p className="mt-4 text-muted-foreground text-sm leading-[1.8] md:text-base">
            Elite facilities to forge the best version of you.
          </p>
        </div>

        <div data-scroll-text="2" className="absolute w-full max-w-2xl opacity-0 translate-y-10 blur-md">
          <h2 className="font-[Manrope] text-4xl md:text-6xl font-medium leading-[1.1] tracking-[-0.04em] text-foreground">
            More Details
          </h2>
          <p className="mt-4 text-muted-foreground text-sm leading-[1.8] md:text-base">
            Everything measured, nothing decorative.
          </p>
        </div>
      </div>

      <div
        data-hero-content
        className="
          relative
          z-10
          flex
          h-full
          flex-col
          items-center
          justify-center
          px-6
          text-center
          md:px-10
        "
      >
        <div className="mx-auto w-full max-w-2xl">
          <p
            data-hero-fade
            className="
              font-[Manrope]
              text-xs
              font-medium
              uppercase
              tracking-[0.2em]
              text-muted-foreground
            "
          >
            Private performance facility — Shoreditch, London
          </p>

          <h1
            data-hero-fade
            className="
              mt-6
              font-[Manrope]
              text-4xl
              md:text-6xl
              font-medium
              leading-[1.1]
              tracking-[-0.04em]
              text-foreground
            "
          >
            Forge your <span className="text-primary">limits.</span>
          </h1>

          <div
            data-hero-fade
            className="
              mt-8
              flex
              flex-col
              items-center
              justify-center
              gap-6
            "
          >
            <p
              className="
                max-w-md
                text-sm
                leading-[1.8]
                text-muted-foreground
                md:text-base
              "
            >
              Twenty-four calibrated platforms, seventeen coaches and an on-site
              performance lab. Everything measured, nothing decorative.
            </p>

            <div className="mt-4">
              <MagneticLink to="/membership">Start training</MagneticLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutBlock() {
  return (
    <section
      className="
        mx-auto
        max-w-[1600px]
        overflow-hidden
        px-6
        py-24
        md:px-10
        md:py-32
      "
    >
      <div className="flex flex-col items-center text-center">
        <div className="max-w-2xl">
          <p
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-muted-foreground
            "
          >
            Since 2011
          </p>

          <SplitText
            text="Training is a discipline, not a mood"
            className="
              mt-5
              justify-center
              font-[Manrope]
              text-[clamp(2rem,4vw,3.5rem)]
              font-medium
              leading-[1.05]
              tracking-[-0.045em]
              text-foreground
            "
          />

          <div
            className="
              mt-8
              space-y-5
              text-[14px]
              leading-[1.8]
              text-muted-foreground
              md:text-[15px]
            "
          >
            <p>
              We do not sell transformation photographs or ninety-day miracles.
              We sell a room where the equipment is calibrated, the coaching is
              constant and the programme in front of you was written from your
              own data.
            </p>

            <p>
              What members notice first is the quiet. What keeps them here for
              years is that the numbers keep moving.
            </p>
          </div>

          <div className="mt-9">
            <MagneticLink to="/about" variant="ghost">
              Our philosophy
            </MagneticLink>
          </div>
        </div>
      </div>
    </section>
  );
}



function TrainersBlock() {
  return (
    <section
      className="
        mx-auto
        max-w-[1600px]
        px-6
        py-24
        md:px-10
        md:py-32
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          text-center
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-muted-foreground
            "
          >
            The coaching floor
          </p>

          <SplitText
            text="Coaches, not cheerleaders"
            className="
              mt-4
              justify-center
              font-[Manrope]
              text-[clamp(2rem,4vw,3.5rem)]
              font-medium
              leading-[1.05]
              tracking-[-0.045em]
              text-foreground
            "
          />
        </div>
      </div>

      <div
        className="
          mt-12
          grid
          gap-px
          overflow-hidden
          bg-border
          lg:grid-cols-3
        "
      >
        {trainers.map((trainer) => (
          <TiltCard key={trainer.name} max={4}>
            <article
              className="
                group
                relative
                h-full
                bg-background
              "
            >
              <div
                className="
                  relative
                  aspect-3/4
                  overflow-hidden
                "
              >
                <img
                  src={trainer.image}
                  alt={`${trainer.name}, ${trainer.role} at Apex Fitness`}
                  width={900}
                  height={1200}
                  loading="lazy"
                  className="
                    size-full
                    object-cover
                    grayscale
                    transition-all
                    duration-[1000ms]
                    ease-[cubic-bezier(0.16,1,0.3,1)]
                    group-hover:scale-105
                    group-hover:grayscale-0
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-background
                    via-background/10
                    to-transparent
                  "
                />
              </div>

              <div className="p-7">
                <p
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-muted-foreground
                  "
                >
                  {trainer.role}
                </p>

                <h3
                  className="
                    mt-2
                    font-[Manrope]
                    text-xl
                    font-medium
                    tracking-[-0.03em]
                    text-foreground
                  "
                >
                  {trainer.name}
                </h3>
              </div>
            </article>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function Index() { console.log({ MagneticLink, BeforeAfter, Marquee, Reveal, SplitText, FinalCTA, MembershipGrid, StatsBand, Testimonials, FacilityScroller, ProgramList, TiltCard });
  return (
    <>
      <Hero />

      <div
        className="
          border-y
          border-border
          bg-card
        "
      >
        <Marquee items={marqueeWords} />
      </div>

      <AboutBlock />

      <section
        className="
          mx-auto
          max-w-[1600px]
          px-6
          py-24
          text-center
          md:px-10
          md:py-32
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-muted-foreground
            "
          >
            Four disciplines
          </p>

          <SplitText
            text="Programmes"
            className="
              mt-4
              justify-center
              font-[Manrope]
              text-[clamp(2rem,4vw,3.5rem)]
              font-medium
              leading-[1.05]
              tracking-[-0.045em]
              text-foreground
            "
          />
        </div>

        <div className="mt-12">
          <ProgramList />
        </div>
      </section>

      <TrainersBlock />

      <section className="border-t border-border">
        <div
          className="
            mx-auto
            max-w-[1600px]
            px-6
            py-24
            text-center
            md:px-10
            md:py-32
          "
        >
          <p
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-muted-foreground
            "
          >
            The building
          </p>

          <SplitText
            text="Four rooms, one standard"
            className="
              mt-4
              justify-center
              font-[Manrope]
              text-[clamp(2rem,4vw,3.5rem)]
              font-medium
              leading-[1.05]
              tracking-[-0.045em]
              text-foreground
            "
          />
        </div>

        <FacilityScroller />
      </section>

      <StatsBand />

      <section
        className="
          mx-auto
          max-w-[1600px]
          px-6
          py-24
          text-center
          md:px-10
          md:py-32
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
          "
        >
          <p
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-muted-foreground
            "
          >
            Twenty-four weeks
          </p>

          <SplitText
            text="Proof, not promises"
            className="
              mt-4
              justify-center
              font-[Manrope]
              text-[clamp(2rem,4vw,3.5rem)]
              font-medium
              leading-[1.05]
              tracking-[-0.045em]
              text-foreground
            "
          />

          <p
            className="
              mt-6
              max-w-md
              text-[14px]
              leading-[1.8]
              text-muted-foreground
            "
          >
            Tom came in able to deadlift 90 kg. Twenty-four weeks of periodised
            strength work later he pulled 200. Drag the handle to see the
            difference the programme made.
          </p>
        </div>

        <div className="mt-12">
          <Reveal>
            <BeforeAfter before={images.before} after={images.after} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border">
        <div
          className="
            mx-auto
            max-w-[1600px]
            px-6
            py-24
            text-center
            md:px-10
            md:py-32
          "
        >
          <p
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-muted-foreground
            "
          >
            Membership
          </p>

          <SplitText
            text="Pick your level"
            className="
              mt-4
              justify-center
              font-[Manrope]
              text-[clamp(2rem,4vw,3.5rem)]
              font-medium
              leading-[1.05]
              tracking-[-0.045em]
              text-foreground
            "
          />

          <div className="mt-12">
            <MembershipGrid />
          </div>
        </div>
      </section>

      <Testimonials />

      <FinalCTA />
    </>
  );
}
