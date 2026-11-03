import {
  Apple,
  Dumbbell,
  Flower2,
  Gift,
  HeartPulse,
  Sparkles,
} from "lucide-react";

const SERVICES = [
  { icon: Flower2, label: "Yoga" },
  { icon: Dumbbell, label: "Fitness and Zumba" },
  { icon: Apple, label: "Nutrition" },
  { icon: Sparkles, label: "Meditation" },
  { icon: HeartPulse, label: "Health check-ups" },
  { icon: Gift, label: "Wellness packages", tag: "Coming soon" },
];

export function ServicesStrip() {
  return (
    <section className="section section-sage services-band" id="services">
      <div className="container">
        <div className="section-head center">
          <h2>Everything for your wellbeing, in one place</h2>
          <p>
            Ayovira is a wellness ecosystem that connects you with the right
            professionals and services.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map(({ icon: Icon, label, tag }) => (
            <div className="service-item" key={label}>
              <span className="service-icon">
                <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="service-label">
                {label}
                {tag ? <span className="service-tag">{tag}</span> : null}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
