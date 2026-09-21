import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#f8f4eb] group-[.toaster]:text-black group-[.toaster]:border-black/10 group-[.toaster]:shadow-2xl",
          description: "group-[.toast]:text-black",
          actionButton:
            "group-[.toast]:border-black/20 group-[.toast]:bg-transparent group-[.toast]:text-black",
          cancelButton:
            "group-[.toast]:bg-black/5 group-[.toast]:text-black",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
