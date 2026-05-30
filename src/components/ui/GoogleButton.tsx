import { FcGoogle } from "react-icons/fc";
import Spinner from "./Spinner";

const GoogleButton = ({
  onClick,
  isLoading,
}: {
  onClick: () => void;
  isLoading: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className="w-full mb-6 h-12 bg-(--surface-muted) border-2 border-(--border) rounded-lg font-mono font-medium hover:bg-(--surface-hover) transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <FcGoogle size={20} />
          <span>Sign in with Google</span>
        </>
      )}
    </button>
  );
};

export default GoogleButton;