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

import { ChatWidget } from "@/components/site/ChatWidget";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">٤٠٤</p>
        <h1 className="mt-4 text-2xl font-bold text-foreground">الصفحة غير موجودة</h1>
        <p className="mt-3 text-sm leading-8 text-muted-foreground">
          الرابط الذي تبحث عنه غير متاح أو تم نقله. يمكنك العودة للصفحة الرئيسية أو حجز موعد مباشرة.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/"
            className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            العودة للرئيسية
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
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-bold text-foreground">تعذّر تحميل هذه الصفحة</h1>
        <p className="mt-3 text-sm leading-8 text-muted-foreground">
          حدث خطأ غير متوقع. يمكنك المحاولة مرة أخرى، أو التواصل مع فريق العيادة مباشرة.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            إعادة المحاولة
          </button>
          <a
            href="/"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground"
          >
            العودة للرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "المدار الذهبي لطب الأسنان | عناية تعرف الفرق" },
      {
        name: "description",
        content:
          "عيادة المدار الذهبي لطب الأسنان — خبرة طبية، تقنيات حديثة، ورعاية تبدأ من الاستماع. احجز موعدك أو تحدث مع المساعد الذكي.",
      },
      { name: "theme-color", content: "#0B1720" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Tajawal:wght@400;500;700;800&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:right-3 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        تخطي إلى المحتوى
      </a>
      <SiteHeader onOpenAssistant={() => setAssistantOpen(true)} />
      <main id="main">
        {/* Required: nested routes render here. */}
        <Outlet />
      </main>
      <SiteFooter />
      <ChatWidget open={assistantOpen} onOpenChange={setAssistantOpen} />
    </QueryClientProvider>
  );
}
