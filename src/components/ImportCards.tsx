"use client";
import { Button } from "@/components/ui/button";
import { blackCards } from "@/data/black-cards";
import whiteCards from "@/data/white-cards";
import { api } from "@/trpc/react";
import { type Card } from "@prisma/client";
import { useRouter } from "next/navigation";

export const ImportCards = () => {
  const router = useRouter();

  const importCards = api.card.importCards.useMutation({
    onSuccess: () => {
      // Itt hajtsd végre az onSuccess műveleteket
      router.refresh();
    },
  });

  const clearCards = api.card.clearCards.useMutation({
    onSuccess: () => {
      // Itt hajtsd végre az onSuccess műveleteket
      router.refresh();
    },
  });

  return (
    <div>
      <Button
        onClick={() => importCards.mutate(blackCards as Card[])}
        variant="default"
      >
        {importCards.isLoading ? "Importing..." : "Import Black Cards"}
      </Button>

      <Button
        onClick={() => importCards.mutate(whiteCards as Card[])}
        variant="outline"
      >
        {importCards.isLoading ? "Importing..." : "Import White Cards"}
      </Button>

      <Button onClick={() => clearCards.mutate()} variant="default">
        {clearCards.isLoading ? "Clearing..." : "Clear Cards"}
      </Button>
    </div>
  );
};

export default ImportCards;
