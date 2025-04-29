// components/ScrollVideoSection.tsx

"use client";
import React, { useRef, useEffect, useState } from "react";

const sections = [
  {
    id: "itinerary",
    title: "Enter itinerary information",
    description:
      "Select your destination country, travel dates, and number of travelers.",
    videoSrc: "/v1.mp4",
  },
  {
    id: "upload",
    title: "Bulk Upload all your documents",
    description: "Automatically detect and organize your documents.",
    videoSrc: "/v2.mp4",
  },
  {
    id: "relax",
    title: "Be relaxed and wait for your Visa",
    description: "Track your visa status in real-time from the panel.",
    videoSrc: "/v3.mp4",
  },
];

export default function ScrollVideoSection() {
  const [currentVideo, setCurrentVideo] = useState(sections[0].videoSrc);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const idx = sectionRefs.current.findIndex(
            (ref) => ref?.id === visibleEntry.target.id
          );
          if (idx !== -1) {
            setCurrentVideo(sections[idx].videoSrc);
          }
        }
      },
      {
        root: null,
        threshold: 0.6,
      }
    );

    const currentRefs = sectionRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="flex flex-col bg-black text-white lg:flex-row w-full max-w-7xl mx-auto py-10 px-4 space-y-10 lg:space-y-0 lg:space-x-10 relative mt-10 mb-10">
      {/* Left Video Section */}
      <div className="lg:w-1/2 sticky top-20 bg-black rounded-lg overflow-hidden z-10">
        <video
          key={currentVideo}
          src={currentVideo}
          autoPlay
          muted
          loop
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Vertical Line */}
      <div className="hidden lg:block w-px bg-gray-300 absolute left-1/2 top-0 bottom-0 z-0" />

      {/* Right Text Section */}
      <div className="lg:w-1/2 flex flex-col space-y-20 z-10 ml-30 items-start mt-10">
        {sections.map((section, index) => (
          <div
            key={section.id}
            id={section.id}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className="space-y-4 text-left"
          >
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <p className="text-gray-600">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
