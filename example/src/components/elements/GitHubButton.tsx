import { AiFillGithub } from 'react-icons/ai';

export default function GitHubButton({ className }: { className: string }) {
  return (
    <a
      href="https://github.com/derodero24/react-web3-icons"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="GitHub repository"
    >
      <AiFillGithub />
    </a>
  );
}
