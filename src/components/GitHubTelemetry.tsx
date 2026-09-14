"use client";

import { useEffect, useState } from "react";
import { GitCommit, GitPullRequest, ExternalLink, Activity, Radio } from "lucide-react";
import { playSound } from "@/lib/audio";

interface GitHubActivity {
  repo: string;
  message: string;
  timeAgo: string;
  type: string;
}

export default function GitHubTelemetry() {
  const [activity, setActivity] = useState<GitHubActivity>({
    repo: "varun-pahuja/portfolio",
    message: "feat: enhance Easter egg discoverability & architecture inspect",
    timeAgo: "recently",
    type: "PushEvent",
  });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchGitHubTelemetry() {
      try {
        const res = await fetch("https://api.github.com/users/varun-pahuja/events/public?per_page=5", {
          headers: { Accept: "application/vnd.github.v3+json" },
        });

        if (!res.ok) return;
        const data = await res.json();
        if (cancelled || !Array.isArray(data) || data.length === 0) return;

        const pushEvent = data.find((e: { type: string }) => e.type === "PushEvent") || data[0];
        if (pushEvent) {
          const repoName = pushEvent.repo?.name || "varun-pahuja/portfolio";
          const commitMsg =
            pushEvent.payload?.commits?.[0]?.message ||
            `Telemetry active on ${pushEvent.type.replace("Event", "")}`;
          
          // Calculate humanized time
          const created = new Date(pushEvent.created_at);
          const diffHours = Math.round((Date.now() - created.getTime()) / (1000 * 60 * 60));
          const timeText = diffHours <= 1 ? "just now" : `${diffHours}h ago`;

          setActivity({
            repo: repoName.replace("varun-pahuja/", ""),
            message: commitMsg.split("\n")[0],
            timeAgo: timeText,
            type: pushEvent.type,
          });
          setIsLive(true);
        }
      } catch {
        // Graceful fallback to initial values
      }
    }

    fetchGitHubTelemetry();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-dim)] bg-[var(--bg-lacquer)]/60 text-xs font-[family-name:var(--font-geist-mono)] text-[var(--text-stone)] shadow-sm">
      <div className="flex items-center gap-1.5 text-[var(--accent-vermillion)]">
        <span className="relative flex h-2 w-2">
          <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[var(--accent-vermillion)] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-vermillion)]" />
        </span>
        <span className="font-bold text-[10px] tracking-wider uppercase">
          {isLive ? "LIVE TELEMETRY" : "GITHUB COMMITS"}
        </span>
      </div>

      <span className="text-[var(--border-dim)]">|</span>

      <a
        href={`https://github.com/varun-pahuja/${activity.repo}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => playSound("click")}
        className="flex items-center gap-1.5 hover:text-[var(--text-washi)] transition-colors truncate max-w-[220px] sm:max-w-[320px]"
        title={`${activity.repo}: ${activity.message}`}
      >
        <GitCommit className="w-3 h-3 text-[var(--accent-gold)] flex-shrink-0" />
        <span className="text-[var(--text-washi)] font-semibold truncate">{activity.repo}</span>
        <span className="text-[var(--text-stone)] truncate hidden md:inline">: {activity.message}</span>
        <span className="text-[10px] text-[var(--accent-vermillion)] flex-shrink-0 font-mono">({activity.timeAgo})</span>
      </a>
    </div>
  );
}
