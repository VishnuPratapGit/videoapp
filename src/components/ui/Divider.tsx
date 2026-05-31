const Divider = ({ label }: { label?: string }) => {
  return (
    <div className="flex w-full">
      <div className="border-t border-(--border-fade) h-0 w-full"></div>
      {label && (
        <>
          <span className="-translate-y-1/2 text-(--border-fade) font-semibold p-2 rounded-full">
            {label}
          </span>
          <div className="border-t border-(--border-fade) h-0 w-full"></div>
        </>
      )}
    </div>
  );
};

export default Divider;
