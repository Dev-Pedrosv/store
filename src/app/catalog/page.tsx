import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { ShapesIcon } from "lucide-react";
import CatalogItem from "./components/catalog";

const CatalogPage = async () => {
  const categories = await prismaClient.category.findMany({});

  if (!categories) return null;

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-1.5 text-base uppercase"
        variant="outline"
      >
        <ShapesIcon size={16} />
        Catálogo
      </Badge>

      <div className="grid grid-cols-2 gap-8">
        {categories.map((category) => (
          <CatalogItem category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
