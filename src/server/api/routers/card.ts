import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { CardType } from "@prisma/client";
import { z } from "zod";

export const cardRouter = createTRPCRouter({
  getAllCards: publicProcedure.query(({ ctx }) => {
    return ctx.db.card.findMany();
  }),

  getWhiteCards: publicProcedure.query(({ ctx }) => {
    return ctx.db.card.findMany({
      where: {
        cardType: CardType.WHITE,
      },
    });
  }),

  getBlackCards: publicProcedure.query(({ ctx }) => {
    return ctx.db.card.findMany({
      where: {
        cardType: CardType.BLACK,
      },
    });
  }),

  importCards: publicProcedure
    .input(
      z.array(
        z.object({ text: z.string().min(1), cardType: z.nativeEnum(CardType) }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.card.createMany({
        data: input,
      });
    }),

  clearCards: publicProcedure.mutation(async ({ ctx }) => {
    return ctx.db.card.deleteMany({});
  }),
});
