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
      className="w-full mb-6 h-12 bg-white border-2 border-neutral-300 dark:border-neutral-600 dark:bg-neutral-900 rounded-lg font-mono font-medium text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
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