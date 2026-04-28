"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Link as LinkIcon, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key, 10) !== id) {
          newState[parseInt(key, 10)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.28) % 360).toFixed(3)));
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = isMobile ? 118 : 220;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "border-transparent bg-brand-teal text-white";
      case "in-progress":
        return "border-transparent bg-brand-mint text-brand-stone";
      case "pending":
        return "border border-white/20 bg-white/10 text-white/80";
      default:
        return "border border-white/20 bg-white/10 text-white/80";
    }
  };

  return (
    <div
      className="flex min-h-[46rem] w-full items-center justify-center overflow-hidden rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(32,86,92,0.88),#081316_62%)] px-4 py-10 text-white sm:px-8"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative flex h-full min-h-[38rem] w-full max-w-5xl items-center justify-center pt-24 sm:pt-28">
        <div className="absolute inset-x-0 top-0 z-20 mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-100">
            Processus dynamique
          </p>
          <h3 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Une méthode visible, pas une suite d’étapes abstraites.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/76">
            Le cercle tourne en continu. Cliquez sur un nœud pour voir le niveau d’énergie, les
            points reliés et la logique de progression de la mission.
          </p>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute h-[18rem] w-[18rem] rounded-full opacity-40 sm:h-[28rem] sm:w-[28rem]"
            style={{
              background:
                "conic-gradient(from 90deg, rgba(117,229,219,0.0) 0deg, rgba(117,229,219,0.55) 38deg, rgba(117,229,219,0.0) 86deg, rgba(255,255,255,0) 300deg, rgba(255,255,255,0.28) 340deg, rgba(117,229,219,0.0) 360deg)",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 58%, black 61%, black 64%, transparent 67%)",
              maskImage:
                "radial-gradient(circle, transparent 58%, black 61%, black 64%, transparent 67%)"
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-teal via-cyan-400 to-brand-mint shadow-[0_0_65px_rgba(97,209,219,0.45)]"
          >
            <div className="absolute h-20 w-20 animate-ping rounded-full border border-white/15 opacity-70" />
            <div
              className="absolute h-24 w-24 animate-ping rounded-full border border-white/10 opacity-50"
              style={{ animationDelay: "0.5s" }}
            />
            <div className="h-9 w-9 rounded-full bg-white/80 backdrop-blur-md" />
          </motion.div>

          <div className="absolute h-[15rem] w-[15rem] rounded-full border border-white/12 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] sm:h-96 sm:w-96" />
          <div className="absolute h-[10rem] w-[10rem] rounded-full border border-white/8 sm:h-60 sm:w-60" />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute cursor-pointer transition-all duration-700"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute -inset-1 rounded-full ${isPulsing ? "animate-pulse" : ""}`}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 70%)",
                    width: `${item.energy * 0.45 + 40}px`,
                    height: `${item.energy * 0.45 + 40}px`,
                    left: `-${(item.energy * 0.45 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.45 + 40 - 40) / 2}px`
                  }}
                />

                <div
                  className={[
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 transform shadow-[0_0_20px_rgba(255,255,255,0.08)]",
                    isExpanded
                      ? "scale-150 border-white bg-white text-black shadow-lg shadow-white/30"
                      : isRelated
                      ? "border-white bg-white/60 text-black animate-pulse"
                      : "border-white/40 bg-black text-white"
                  ].join(" ")}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={[
                    "absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/35 px-3 py-1.5 text-sm font-semibold tracking-[0.18em] uppercase shadow-[0_12px_30px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-all duration-300",
                    isExpanded ? "scale-110 text-white" : "text-white/88"
                  ].join(" ")}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute left-1/2 top-24 w-[18rem] -translate-x-1/2 overflow-visible border-white/20 bg-black/90 text-white shadow-xl shadow-white/10 backdrop-blur-lg">
                    <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/50" />
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between gap-3">
                        <Badge className={getStatusStyles(item.status)}>
                          {item.status === "completed"
                            ? "Completed"
                            : item.status === "in-progress"
                            ? "In progress"
                            : "Pending"}
                        </Badge>
                        <span className="text-xs font-mono text-white/50">{item.date}</span>
                      </div>
                      <CardTitle className="mt-2 text-lg text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs leading-6 text-white/80">
                      <p>{item.content}</p>

                      <div className="mt-4 border-t border-white/10 pt-3">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1">
                            <Zap size={10} />
                            Energy level
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-brand-teal"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 border-t border-white/10 pt-3">
                          <div className="mb-2 flex items-center gap-1 text-white/70">
                            <LinkIcon size={10} />
                            <h4 className="text-[10px] font-medium uppercase tracking-[0.18em]">
                              Connected nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="h-7 rounded-full border-white/20 bg-transparent px-2.5 py-0 text-[10px] text-white/80 hover:bg-white/10 hover:text-white"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={8} className="ml-1 text-white/60" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
