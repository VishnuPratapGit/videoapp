const Divider = ({ label }: { label: string }) => {
  return (
    <div className="flex w-full mt-6">
      <div className="border-t border-(--text-fade) h-0 w-full"></div>
      <span className="-translate-y-1/2 text-(--text-fade) font-semibold p-2 rounded-full">
        {label}
      </span>
      <div className="border-t border-(--text-fade) h-0 w-full"></div>
    </div>
  );
};

export default Divider;