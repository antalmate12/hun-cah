// import { unstable_noStore as noStore } from "next/cache";
import ImportCards from "@/components/ImportCards";
import { api } from "@/trpc/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  // noStore();
  const cards = await api.card.getAllCards.query();

  return (
    <main className="">
      <h1>Hun CAH</h1>

      {/* <ImportCards /> */}

      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            <p>
              [ {card.topic} ] - {card.text}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
