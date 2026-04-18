import { MDXRemote } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      {...props}
      className={cn(
        "mt-12 mb-4 font-display text-3xl text-ink-strong tracking-tight",
        props.className,
      )}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className={cn(
        "mt-10 mb-4 font-display text-2xl text-ink-strong tracking-tight",
        props.className,
      )}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      className={cn(
        "mt-8 mb-3 font-display text-xl text-ink-strong",
        props.className,
      )}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className={cn("my-5 text-base leading-relaxed text-ink", props.className)}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className={cn(
        "text-ink-strong underline underline-offset-4 decoration-accent hover:text-accent",
        props.className,
      )}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      {...props}
      className={cn("my-5 list-disc pl-6 space-y-2 text-ink", props.className)}
    />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      {...props}
      className={cn("my-5 list-decimal pl-6 space-y-2 text-ink", props.className)}
    />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li {...props} className={cn("leading-relaxed", props.className)} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className={cn(
        "my-8 border-l-2 border-accent pl-5 py-1 font-display text-xl text-ink-strong italic",
        props.className,
      )}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong
      {...props}
      className={cn("font-medium text-ink-strong", props.className)}
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr {...props} className={cn("my-10 border-divider", props.className)} />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
