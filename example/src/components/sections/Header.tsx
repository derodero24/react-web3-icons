import GitHubButton from '../elements/GitHubButton';
import ThemeButton from '../elements/ThemeButton';

const BUTTONS = [ThemeButton, GitHubButton];

export default function Header() {
  return (
    <header className="absolute right-6 top-3">
      <div className="flex items-center space-x-6">
        {BUTTONS.map(Component => (
          <Component
            key={Component.name}
            className="cursor-pointer text-3xl opacity-75 hover:opacity-100"
          />
        ))}
      </div>
    </header>
  );
}
