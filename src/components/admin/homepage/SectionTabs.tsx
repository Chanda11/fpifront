interface Props {
  active: string;
  onChange: (tab: string) => void;
}

const tabs = [
  "Hero",
  "Welcome",
  "About",
  "Statistics",
  "CTA",
];

const SectionTabs = ({
  active,
  onChange,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-3 border-b border-slate-200 pb-5">

      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`
            px-5
            py-2.5
            rounded-xl
            font-medium
            transition-all
            duration-200

            ${
              active === tab
                ? "bg-[#C9293A] text-white shadow-md"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }
          `}
        >
          {tab}
        </button>
      ))}

    </div>
  );
};

export default SectionTabs;