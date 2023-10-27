import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 opacity-70">
      <Loader2 className="animate-spin" />
      Carregando...
    </div>
  );
};

export default Loading;
