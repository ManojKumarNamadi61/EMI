import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-primary-foreground">
      <div className="container">
        <div className="pt-16 pb-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-display">
                Ready when you are
              </h2>
              <div className="mt-6">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90"
                >
                  Get a quote
                </Button>
              </div>
            </div>

            <div className="w-full lg:max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="space-y-8">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-primary-foreground/60 font-body">
                      New projects & business
                    </div>
                    <a
                      href="mailto:hello@easymoveininteriors.com"
                      className="mt-2 block text-sm font-medium font-body hover:underline"
                    >
                      hello@easymoveininteriors.com
                    </a>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-primary-foreground/60 font-body">
                      General questions
                    </div>
                    <a
                      href="mailto:support@easymoveininteriors.com"
                      className="mt-2 block text-sm font-medium font-body hover:underline"
                    >
                      support@easymoveininteriors.com
                    </a>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-primary-foreground/60 font-body">
                      Work
                    </div>
                    <div className="mt-3 space-y-2 text-sm font-body">
                      <a className="block hover:underline" href="/ai-room-measurement">AI Tools</a>
                      <a className="block hover:underline" href="/pricing">Pricing</a>
                      <a className="block hover:underline" href="/reviews">Marketplace</a>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-primary-foreground/60 font-body">
                      Location
                    </div>
                    <div className="mt-3 text-sm font-body text-primary-foreground/80">
                      Online consultations available.
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-primary-foreground/60 font-body">
                      Social
                    </div>
                    <div className="mt-3 space-y-2 text-sm font-body">
                      <a className="block hover:underline" href="#">Instagram</a>
                      <a className="block hover:underline" href="#">Facebook</a>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-primary-foreground/60 font-body">
                      Legal
                    </div>
                    <div className="mt-3 space-y-2 text-sm font-body">
                      <a className="block hover:underline" href="#">Terms</a>
                      <a className="block hover:underline" href="#">Privacy</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-primary-foreground/10 pt-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="text-xs font-body text-primary-foreground/60">
                © 2026 EASYMOVEININTERIORS. All rights reserved.
              </div>
              <div className="leading-none">
                <div className="text-[12vw] md:text-[7vw] lg:text-[100px] font-bold tracking-tight text-primary-foreground font-display">
                  EASYMOVEIN
                </div>
                <div className="mt-2 text-2xl md:text-5xl font-semibold tracking-wide text-primary-foreground/80 font-display text-right">
  INTERIORS
</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
