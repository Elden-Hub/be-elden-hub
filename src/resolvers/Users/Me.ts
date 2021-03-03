import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { Profile } from "../../entity/Profile";
import { isAuth } from "../../middleware/isAuth";
import { Resolver, UseMiddleware, Query, Ctx } from "type-graphql";

@Resolver()
export class Me {
  @UseMiddleware(isAuth)
  @Query(() => Profile, { nullable: true })
  async me(@Ctx() ctx: ExpressContext): Promise<Profile | undefined | string> {
    if (!ctx.req.session?.profileId) {
      return "Please log in to get current user. 💩";
    }

    return Profile.findOne(ctx.req.session?.profileId);
  }
}
