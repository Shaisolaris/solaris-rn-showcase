"use client";

import { useEffect, useState } from "react";

type Author = {
  id: string;
  name: string;
  handle: string;
  initials: string;
  gradient: string;
  verified: boolean;
};

type Post = {
  id: string;
  authorId: string;
  text: string;
  time: string;
  likes: number;
  comments: number;
  reposts: number;
  gradient?: string;
  emoji?: string;
};

const IOS_BLUE = "#007AFF";
const IOS_GRAY = "#8E8E93";
const IOS_BG = "#F2F2F7";
const IOS_SEP = "#C6C6C8";

const AUTHORS: Author[] = [
  { id: "a1", name: "Maya Chen", handle: "mayacodes", initials: "MC", gradient: "from-rose-500 to-pink-600", verified: true },
  { id: "a2", name: "Daniel Okafor", handle: "dokafor", initials: "DO", gradient: "from-sky-500 to-indigo-600", verified: false },
  { id: "a3", name: "Priya Iyer", handle: "priyabuilds", initials: "PI", gradient: "from-emerald-500 to-teal-600", verified: true },
  { id: "a4", name: "Sam Whittaker", handle: "samw", initials: "SW", gradient: "from-amber-500 to-orange-600", verified: false },
  { id: "a5", name: "Lia Romero", handle: "liadesign", initials: "LR", gradient: "from-violet-500 to-fuchsia-600", verified: true },
];

const INITIAL_POSTS: Post[] = [
  {
    id: "p1",
    authorId: "a1",
    text: "Shipped the new onboarding flow today. Down from 7 steps to 4, and we're seeing a 28% lift in signups already. Sometimes the answer is just ✂️.",
    time: "12m",
    likes: 142,
    comments: 18,
    reposts: 9,
    emoji: "✂️",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    id: "p2",
    authorId: "a3",
    text: "Hot take: if your API has more than 3 auth flows, it has too many auth flows. Consolidate to OAuth2 + service tokens and call it a day.",
    time: "38m",
    likes: 89,
    comments: 24,
    reposts: 12,
  },
  {
    id: "p3",
    authorId: "a5",
    text: "New component from the Solaris design system — the segmented control. Built with React Native Reanimated 3. Ships this week 🎨",
    time: "1h",
    likes: 312,
    comments: 41,
    reposts: 28,
    emoji: "🎨",
    gradient: "from-fuchsia-400 to-purple-500",
  },
  {
    id: "p4",
    authorId: "a2",
    text: "Just replaced a bunch of Redux boilerplate with Zustand. 400 fewer lines of code, same features. Why did we wait so long",
    time: "2h",
    likes: 67,
    comments: 15,
    reposts: 4,
  },
  {
    id: "p5",
    authorId: "a4",
    text: "Pushed the iOS 17 update. Dynamic Island, Live Activities, interactive widgets — all working. Expo SDK 50 is a beast.",
    time: "3h",
    likes: 198,
    comments: 22,
    reposts: 17,
    emoji: "📱",
    gradient: "from-sky-400 to-blue-500",
  },
  {
    id: "p6",
    authorId: "a1",
    text: "Coffee ☕️, kitten 🐱, keyboard 💻. Start of a productive Friday.",
    time: "5h",
    likes: 56,
    comments: 8,
    reposts: 2,
  },
];

type Screen = "feed" | "profile" | "search" | "notifications";

export default function RNShowcase() {
  const [dark, setDark] = useState(false);
  const [screen, setScreen] = useState<Screen>("feed");
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<Post | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("solaris-theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("solaris-theme", next ? "dark" : "light");
  };

  const toggleLike = (postId: string) => {
    setLiked((prev) => ({ ...prev, [postId]: !prev[postId] }));
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, likes: liked[postId] ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold text-white shadow-lg"
              style={{ background: IOS_BLUE, boxShadow: `0 8px 24px ${IOS_BLUE}33` }}
            >
              ⚛
            </span>
            <div className="leading-tight">
              <div className="text-base font-semibold">Solaris Feed</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                React Native + Expo showcase
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleDark}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            aria-label="Toggle dark mode"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </header>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_400px]">
          <div className="order-2 lg:order-1">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: IOS_BLUE }} />
              React Native · Expo SDK 50 · iOS 17
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Native iOS &amp; Android, written in React.
            </h1>
            <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-400">
              The phone frame on the right is running a React Native-style social feed. Tap posts,
              like them, switch tabs, open a profile — all interactive. The real app compiles to
              native iOS and Android via Expo.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:max-w-lg">
              <Feature title="One codebase" desc="iOS and Android from the same JS/TS source." />
              <Feature title="Native animations" desc="Reanimated 3 runs at 60fps off the main thread." />
              <Feature title="Over-the-air updates" desc="Push fixes via EAS without app store review." />
              <Feature title="Expo SDK" desc="Camera, maps, notifications, biometrics — first-class." />
            </div>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Stack
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["React Native", "Expo SDK 50", "Reanimated 3", "Zustand", "React Navigation", "NativeWind", "EAS Build"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <PhoneFrame>
              <div
                className="flex h-full flex-col"
                style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
                  background: IOS_BG,
                }}
              >
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pb-1 pt-2 text-[11px] font-semibold text-black">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <span>••••</span>
                    <span>󰒢</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Nav bar */}
                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="flex items-center gap-1 text-[14px] font-medium"
                    style={{ color: IOS_BLUE }}
                  >
                    {selected ? "‹ Back" : ""}
                  </button>
                  <div className="text-[15px] font-semibold">
                    {selected
                      ? "Post"
                      : screen === "feed"
                      ? "Feed"
                      : screen === "profile"
                      ? "Profile"
                      : screen === "search"
                      ? "Search"
                      : "Activity"}
                  </div>
                  <button
                    type="button"
                    className="text-[14px] font-medium"
                    style={{ color: IOS_BLUE }}
                  >
                    {!selected && screen === "feed" && "New"}
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                  {selected ? (
                    <PostDetail
                      post={selected}
                      author={AUTHORS.find((a) => a.id === selected.authorId)!}
                      liked={!!liked[selected.id]}
                      onLike={() => toggleLike(selected.id)}
                    />
                  ) : screen === "feed" ? (
                    <div>
                      {posts.map((post) => {
                        const author = AUTHORS.find((a) => a.id === post.authorId)!;
                        return (
                          <button
                            key={post.id}
                            type="button"
                            onClick={() => setSelected(post)}
                            className="w-full border-b border-slate-200 bg-white px-4 py-4 text-left transition active:bg-slate-50"
                          >
                            <div className="flex gap-3">
                              <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${author.gradient} text-xs font-semibold text-white`}
                              >
                                {author.initials}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-1 text-[13px]">
                                  <span className="font-semibold">{author.name}</span>
                                  {author.verified && (
                                    <span style={{ color: IOS_BLUE }} className="text-[11px]">
                                      ✓
                                    </span>
                                  )}
                                  <span style={{ color: IOS_GRAY }}>@{author.handle}</span>
                                  <span style={{ color: IOS_GRAY }}>· {post.time}</span>
                                </div>
                                <p className="mt-1 text-[14px] leading-snug text-black">
                                  {post.text}
                                </p>
                                {post.gradient && post.emoji && (
                                  <div
                                    className={`mt-3 flex h-32 items-center justify-center rounded-2xl bg-gradient-to-br ${post.gradient} text-5xl shadow-inner`}
                                  >
                                    <span className="drop-shadow-lg">{post.emoji}</span>
                                  </div>
                                )}
                                <div className="mt-3 flex items-center gap-6 text-[12px]">
                                  <div className="flex items-center gap-1" style={{ color: IOS_GRAY }}>
                                    <span>💬</span> {post.comments}
                                  </div>
                                  <div className="flex items-center gap-1" style={{ color: IOS_GRAY }}>
                                    <span>🔁</span> {post.reposts}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleLike(post.id);
                                    }}
                                    className="flex items-center gap-1"
                                    style={{ color: liked[post.id] ? "#FF3B30" : IOS_GRAY }}
                                  >
                                    <span>{liked[post.id] ? "❤️" : "🤍"}</span> {post.likes}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : screen === "profile" ? (
                    <ProfileScreen />
                  ) : screen === "search" ? (
                    <SearchScreen />
                  ) : (
                    <NotificationsScreen />
                  )}
                </div>

                {/* Tab bar */}
                <nav className="flex items-center justify-around border-t border-slate-200 bg-white py-2 pb-6">
                  {[
                    { id: "feed", icon: "🏠", label: "Feed" },
                    { id: "search", icon: "🔍", label: "Search" },
                    { id: "notifications", icon: "🔔", label: "Activity" },
                    { id: "profile", icon: "👤", label: "Profile" },
                  ].map((t) => {
                    const active = screen === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setScreen(t.id as Screen);
                          setSelected(null);
                        }}
                        className="flex flex-col items-center gap-0.5 px-3"
                      >
                        <span className="text-xl">{t.icon}</span>
                        <span
                          className="text-[10px] font-semibold"
                          style={{ color: active ? IOS_BLUE : IOS_GRAY }}
                        >
                          {t.label}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </PhoneFrame>
          </div>
        </div>

        <footer className="mt-16 text-center text-xs text-slate-400">
          Built with React Native + Expo · © {new Date().getFullYear()} Solaris Feed
        </footer>
      </div>
    </main>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative overflow-hidden rounded-[48px] border-[10px] border-slate-900 bg-slate-900 shadow-2xl"
      style={{ width: 360, height: 760 }}
    >
      <div className="absolute left-1/2 top-0 z-10 h-7 w-36 -translate-x-1/2 rounded-b-3xl bg-slate-900" />
      <div className="relative h-full w-full overflow-hidden rounded-[38px]">
        {children}
      </div>
    </div>
  );
}

function PostDetail({
  post,
  author,
  liked,
  onLike,
}: {
  post: Post;
  author: Author;
  liked: boolean;
  onLike: () => void;
}) {
  return (
    <div className="border-b border-slate-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${author.gradient} text-sm font-semibold text-white`}
        >
          {author.initials}
        </div>
        <div>
          <div className="flex items-center gap-1 text-[14px] font-semibold">
            {author.name}
            {author.verified && <span style={{ color: IOS_BLUE }}>✓</span>}
          </div>
          <div className="text-[12px]" style={{ color: IOS_GRAY }}>
            @{author.handle}
          </div>
        </div>
      </div>
      <p className="mt-4 text-[16px] leading-relaxed text-black">{post.text}</p>
      {post.gradient && post.emoji && (
        <div
          className={`mt-4 flex h-44 items-center justify-center rounded-2xl bg-gradient-to-br ${post.gradient} text-6xl shadow-inner`}
        >
          <span className="drop-shadow-xl">{post.emoji}</span>
        </div>
      )}
      <div className="mt-4 border-y border-slate-100 py-3 text-[12px]" style={{ color: IOS_GRAY }}>
        {post.time} · 9,421 impressions
      </div>
      <div className="mt-3 flex items-center justify-around text-[14px]">
        <div className="flex items-center gap-1.5" style={{ color: IOS_GRAY }}>
          <span>💬</span> {post.comments}
        </div>
        <div className="flex items-center gap-1.5" style={{ color: IOS_GRAY }}>
          <span>🔁</span> {post.reposts}
        </div>
        <button
          type="button"
          onClick={onLike}
          className="flex items-center gap-1.5"
          style={{ color: liked ? "#FF3B30" : IOS_GRAY }}
        >
          <span>{liked ? "❤️" : "🤍"}</span> {post.likes}
        </button>
        <div style={{ color: IOS_GRAY }}>↗</div>
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="bg-white">
      <div
        className="h-32 bg-gradient-to-br from-indigo-500 to-violet-600"
      />
      <div className="px-4 pb-4">
        <div
          className="relative -mt-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-xl font-semibold text-white"
          style={{ border: "4px solid white" }}
        >
          SA
        </div>
        <div className="mt-3">
          <div className="flex items-center gap-1 text-lg font-semibold">
            Shai A. <span style={{ color: IOS_BLUE }}>✓</span>
          </div>
          <div className="text-[13px]" style={{ color: IOS_GRAY }}>
            @shaibuilds
          </div>
          <p className="mt-2 text-[14px] text-black">
            Full-stack engineer. Shipping software that clients actually use. 18 years deep. 🚀
          </p>
          <div className="mt-3 flex gap-4 text-[12px]">
            <span><span className="font-semibold text-black">1,284</span> <span style={{ color: IOS_GRAY }}>following</span></span>
            <span><span className="font-semibold text-black">12.4k</span> <span style={{ color: IOS_GRAY }}>followers</span></span>
          </div>
          <button
            type="button"
            className="mt-4 w-full rounded-full py-2 text-[13px] font-semibold text-white"
            style={{ background: IOS_BLUE }}
          >
            Edit profile
          </button>
        </div>
      </div>
      <div className="border-t border-slate-200">
        {["Posts", "Replies", "Media", "Likes"].map((tab, i) => (
          <div
            key={tab}
            className="px-4 py-3 text-[13px] font-semibold"
            style={{ color: i === 0 ? IOS_BLUE : IOS_GRAY, borderBottom: i === 0 ? `2px solid ${IOS_BLUE}` : "none", display: "inline-block" }}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchScreen() {
  const trends = [
    { topic: "React Native", posts: "12.4k posts" },
    { topic: "Expo SDK 50", posts: "8.1k posts" },
    { topic: "Dynamic Island", posts: "5.7k posts" },
    { topic: "EAS Build", posts: "3.2k posts" },
    { topic: "TypeScript", posts: "28.9k posts" },
  ];
  return (
    <div className="bg-white">
      <div className="p-4">
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5"
          style={{ background: IOS_BG }}
        >
          <span style={{ color: IOS_GRAY }}>🔍</span>
          <span className="text-[14px]" style={{ color: IOS_GRAY }}>
            Search Solaris
          </span>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: IOS_GRAY }}>
          Trending
        </div>
        {trends.map((t) => (
          <div
            key={t.topic}
            className="flex items-center justify-between border-t border-slate-100 px-4 py-3"
          >
            <div>
              <div className="text-[14px] font-semibold">#{t.topic}</div>
              <div className="text-[11px]" style={{ color: IOS_GRAY }}>
                {t.posts}
              </div>
            </div>
            <span style={{ color: IOS_GRAY }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsScreen() {
  const items = [
    { icon: "❤️", text: "Maya Chen liked your post", time: "2m" },
    { icon: "🔄", text: "Priya Iyer reposted your thread", time: "14m" },
    { icon: "💬", text: "Daniel Okafor replied: 'This is exactly what we needed'", time: "1h" },
    { icon: "➕", text: "Lia Romero started following you", time: "3h" },
    { icon: "❤️", text: "Sam Whittaker liked your reply", time: "5h" },
  ];
  return (
    <div className="bg-white">
      {items.map((n, i) => (
        <div
          key={i}
          className="flex items-center gap-3 border-b border-slate-100 px-4 py-3"
        >
          <div className="text-xl">{n.icon}</div>
          <div className="flex-1 text-[14px] text-black">{n.text}</div>
          <div className="text-[11px]" style={{ color: IOS_GRAY }}>
            {n.time}
          </div>
        </div>
      ))}
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">{desc}</div>
    </div>
  );
}
