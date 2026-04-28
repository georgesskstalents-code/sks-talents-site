"use client";

import React, { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.92", "end 0.25"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [24, -48]);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[34rem] items-center justify-center overflow-hidden px-3 py-4 sm:min-h-[44rem] sm:px-6 sm:py-8 lg:min-h-[54rem] lg:px-10"
    >
      <div className="relative w-full py-4 sm:py-8 lg:py-12" style={{ perspective: "1100px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto max-w-4xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000001f, 0 9px 20px #16333426, 0 37px 37px #16333422, 0 84px 50px #16333414, 0 149px 60px #16333408, 0 233px 65px #16333403"
      }}
      initial={{ opacity: 0, y: 42, rotateX: 20, scale: 1.04 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      animate={{ y: [0, -8, 0] }}
      transition={{
        y: {
          duration: 4.2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        },
        opacity: { duration: 0.8, ease: "easeOut" },
        rotateX: { duration: 0.8, ease: "easeOut" },
        scale: { duration: 0.8, ease: "easeOut" }
      }}
      className="mx-auto mt-4 h-[16rem] w-full max-w-5xl rounded-[34px] border border-[#cbe8e4] bg-[#153236] p-2 shadow-2xl sm:mt-6 sm:h-[22rem] sm:p-4 md:h-[28rem] lg:h-[34rem] lg:p-6"
    >
      <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-white/10 p-2 sm:p-4">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_32%),linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.06)_48%,transparent_75%)]" />
        <div className="h-full w-full overflow-hidden rounded-[20px] bg-gray-100">{children}</div>
      </div>
    </motion.div>
  );
};
