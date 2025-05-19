import { CircleUserRound } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  showUserLink?: boolean;
}

export function PageHeader({ title, showUserLink = false }: PageHeaderProps) {
  return (
    <div className="md:flex flex-row-reverse justify-between mb-8">
      {showUserLink && (
        <div className="mb-5 pt-1">
          <Link href="/compte" className="hover:underline">
            <CircleUserRound className="inline" />
            <span className="text-sm"> Votre Compte </span>
          </Link>
        </div>
      )}
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
}
