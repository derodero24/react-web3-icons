import GitHubButton from '../elements/GitHubButton';
import ThemeButton from '../elements/ThemeButton';

const BUTTONS = [ThemeButton, GitHubButton];

export default function Header() {
  return (
    <header className="absolute top-3 right-6">
      <div className="flex items-center space-x-6">
        {BUTTONS.map((Component, idx) => (
          <Component
            key={idx}
            className="cursor-pointer text-3xl opacity-75 hover:opacity-100"
          />
        ))}
      </div>
    </header>
  );
}
