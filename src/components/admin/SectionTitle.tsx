import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className = "",
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-2xl font-bold text-[#081A3A]">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-gray-500">
          {subtitle}
        </p>
      )}

      <div className="w-20 h-1 bg-[#C9293A] rounded-full mt-4"></div>
    </div>
  );
};

export default SectionTitle;