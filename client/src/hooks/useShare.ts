import { useToast } from "@/hooks/use-toast"

type ShareData = {
  title: string;
  text: string;
};

export function useShare() {
  const { toast } = useToast();

  const shareData = async ({ title, text }: ShareData) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
        });
        toast({
          title: "Éxito",
          description: "Compartido correctamente"
        });
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          toast({
            title: "Error",
            description: "Error al compartir",
            variant: "destructive"
          });
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        toast({
          title: "Éxito",
          description: "Copiado al portapapeles"
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al copiar al portapapeles",
          variant: "destructive"
        });
      }
    }
  };

  return { shareData };
}