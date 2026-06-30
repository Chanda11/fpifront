interface Props {
  published: boolean;
}

const StatusBadge = ({
  published,
}: Props) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        published
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
};

export default StatusBadge;