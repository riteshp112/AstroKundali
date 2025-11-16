import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      style={
        {
          "--normal-bg": "#ffffff",
          "--normal-text": "#333333",
          "--normal-border": "#E5E5E5",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
