import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
};

function IconBase({
  title,
  children,
  ...props
}: React.PropsWithChildren<IconProps>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
      className={props.className}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <IconBase {...props} title={props.title ?? "GitHub"}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.61-3.37-1.18-3.37-1.18c-.45-1.16-1.1-1.47-1.1-1.47c-.9-.63.07-.62.07-.62c.99.07 1.52 1.03 1.52 1.03c.88 1.52 2.31 1.08 2.87.83c.09-.65.35-1.08.63-1.33c-2.22-.26-4.56-1.12-4.56-4.98c0-1.1.39-2 1.03-2.71c-.1-.26-.45-1.31.1-2.73c0 0 .84-.27 2.75 1.03a9.6 9.6 0 0 1 5 0c1.9-1.3 2.75-1.03 2.75-1.03c.55 1.42.2 2.47.1 2.73c.64.7 1.03 1.61 1.03 2.71c0 3.87-2.35 4.72-4.59 4.97c.36.32.69.94.69 1.9v2.81c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"
        clipRule="evenodd"
      />
    </IconBase>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <IconBase {...props} title={props.title ?? "LinkedIn"}>
      <path
        fill="currentColor"
        d="M19.5 3A1.5 1.5 0 0 1 21 4.5v15A1.5 1.5 0 0 1 19.5 21h-15A1.5 1.5 0 0 1 3 19.5v-15A1.5 1.5 0 0 1 4.5 3h15ZM8.1 9H6v11h2.1V9Zm-.98-3.2a1.2 1.2 0 1 0 0 2.4a1.2 1.2 0 0 0 0-2.4ZM20 20v-6.1c0-3.1-1.65-4.55-3.86-4.55c-1.78 0-2.58 0.98-3.03 1.66V9H11v11h2.1v-6c0-1.58.3-3.11 2.26-3.11c1.93 0 1.96 1.8 1.96 3.21V20H20Z"
      />
    </IconBase>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <IconBase {...props} title={props.title ?? "Instagram"}>
      <path
        fill="currentColor"
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 4.5A3.5 3.5 0 1 1 8.5 12A3.5 3.5 0 0 1 12 8.5Zm0 2A1.5 1.5 0 1 0 13.5 12A1.5 1.5 0 0 0 12 10.5ZM17.75 6.6a.85.85 0 1 1-.85.85c0-.47.38-.85.85-.85Z"
      />
    </IconBase>
  );
}
