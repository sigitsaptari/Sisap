import { useState } from "react";
import { ArrowRight, Moon, Plus, Sun } from "lucide-react";
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@sisapds/react";
import type { ButtonVariant } from "@sisapds/react";

const variants: ButtonVariant[] = ["primary", "secondary", "outline", "ghost", "danger"];
const sizes = ["sm", "md", "lg"] as const;

const swatches = [
  "color-bg-canvas",
  "color-bg-surface",
  "color-border-default",
  "color-border-strong",
  "color-fg-default",
  "color-fg-muted",
  "color-action-primary",
  "color-action-primary-hover",
  "color-action-secondary",
  "color-action-danger",
  "color-feedback-success",
  "color-feedback-warning",
  "color-focus-ring",
  "color-overlay-default",
];

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  };

  return (
    <main className="min-h-screen bg-[var(--ds-color-bg-canvas)] px-6 py-10 text-[var(--ds-color-fg-default)] transition-colors md:px-12">
      <div className="mx-auto max-w-5xl space-y-12">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[var(--ds-typography-font-size-3xl)] font-bold tracking-tight">
              SisapDS Playground
            </h1>
            <p className="mt-1 text-[var(--ds-typography-font-size-md)] text-[var(--ds-color-fg-muted)]">
              Instant prototyping app — components are driven by W3C DTCG tokens.
            </p>
          </div>
          <Button variant="secondary" size="icon" aria-label="Toggle color theme" onClick={toggleTheme}>
            {theme === "light" ? <Moon /> : <Sun />}
          </Button>
        </header>

        <section aria-labelledby="buttons-heading" className="space-y-5">
          <h2 id="buttons-heading" className="text-[var(--ds-typography-font-size-xl)] font-semibold">
            Button
          </h2>
          <div className="space-y-3 rounded-[var(--ds-radii-xl)] border border-[var(--ds-color-border-default)] bg-[var(--ds-color-bg-surface)] p-6">
            {variants.map((variant) => (
              <div key={variant} className="flex flex-wrap items-center gap-3">
                <span className="w-20 text-[var(--ds-typography-font-size-xs)] uppercase tracking-wide text-[var(--ds-color-fg-muted)]">
                  {variant}
                </span>
                {sizes.map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    {size}
                  </Button>
                ))}
                <Button variant={variant} isLoading loadingText="Saving…">
                  Save
                </Button>
                <Button variant={variant} disabled>
                  Disabled
                </Button>
                <Button variant={variant} size="icon" aria-label="Add item">
                  <Plus />
                </Button>
                <Button variant={variant} leftIcon={<Plus />} rightIcon={<ArrowRight />}>
                  Icons
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="dialog-heading" className="space-y-5">
          <h2 id="dialog-heading" className="text-[var(--ds-typography-font-size-xl)] font-semibold">
            Dialog
          </h2>
          <div className="rounded-[var(--ds-radii-xl)] border border-[var(--ds-color-border-default)] bg-[var(--ds-color-bg-surface)] p-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary" leftIcon={<Plus />}>
                  New project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Create a new project</DialogTitle>
                <DialogDescription>
                  Give your project a name and pick a workspace. You can invite collaborators
                  later from the project settings.
                </DialogDescription>
                <div className="mt-2 flex justify-end gap-3">
                  <DialogClose asChild>
                    <Button variant="secondary">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="primary" rightIcon={<ArrowRight />}>
                      Create
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <section aria-labelledby="tokens-heading" className="space-y-5">
          <h2 id="tokens-heading" className="text-[var(--ds-typography-font-size-xl)] font-semibold">
            Semantic tokens
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {swatches.map((name) => (
              <div key={name} className="space-y-2">
                <div
                  className="h-14 rounded-[var(--ds-radii-md)] border border-[var(--ds-color-border-default)]"
                  style={{ backgroundColor: `var(--ds-${name})` }}
                />
                <p className="truncate text-[var(--ds-typography-font-size-xs)] text-[var(--ds-color-fg-muted)]" title={`--ds-${name}`}>
                  {name}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t border-[var(--ds-color-border-default)] pt-6 text-[var(--ds-typography-font-size-sm)] text-[var(--ds-color-fg-subtle)]">
          Edit <code className="font-mono">tokens/</code> and run <code className="font-mono">npm run tokens:build</code> — components update everywhere.
        </footer>
      </div>
    </main>
  );
}
