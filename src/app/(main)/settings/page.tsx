const Settings = () => {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-xl font-mono">Account</h1>
        <div className="mt-10 border-b pb-10 border-neutral-600">
          <h2 className="text-2xl font-bold">
            Choose how you appear and what you see on Blogger
          </h2>
          <p className="mt-2 text-lg">
            Signed in as{" "} <span className="font-mono text-[#ff2962] underline underline-offset-4">user@example.com</span>
          </p>
        </div>

        <h1 className="text-xl font-mono mt-10">Your Blogger channel</h1>
        <p className="mt-2 text-sm text-neutral-400">
          This is your public presence on Blogger. You need a channel to upload
          your own content, comment on posts, or create playlists.
        </p>

        <div>
            // left; avatar
            // right; name, description, channel url, and edit button
        </div>
      </div>
    );
}

export default Settings;