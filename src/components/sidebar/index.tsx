type Props = {
    sidebarOpen: boolean;
};

export default function Sidebar({ sidebarOpen }: Props) {
  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <h2>Sidebar</h2>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  );
}