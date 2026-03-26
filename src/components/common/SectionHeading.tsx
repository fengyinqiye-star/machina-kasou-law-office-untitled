interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
      <h2
        className={`font-serif-jp text-3xl md:text-4xl font-bold ${
          light ? "text-white" : "text-navy-dark"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? "text-white/70" : "text-gray-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
