import axios from "axios";
import { logger } from "../../middleware";
import { Profile } from "../../entity/Profile";
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import { setSession } from "./helpers";
import { ExpressContext } from "apollo-server-express";

@Resolver()
export class GoogleResolver {
  @UseMiddleware(logger)
  @Mutation(() => Profile)
  async googleSignIn(
    @Ctx() ctx: ExpressContext,
    @Arg("code") code: string
  ): Promise<Profile> {
    try {
      const googleData = {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.CORS_ORIGIN}/google-authentication`,
        grant_type: "authorization_code",
        code,
      };
      const { data: postData } = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: "post",
        data: googleData,
      });

      const { data: getData } = await axios({
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
        method: "get",
        headers: {
          Authorization: `Bearer ${postData.access_token}`,
        },
      });

      let searchForProfile = await Profile.findOne({
        email: getData.email,
      });

      if (!searchForProfile?.confirmed && getData.verified_email) {
        await Profile.update(String(searchForProfile?.id), {
          confirmed: true,
        });
      }

      if (!searchForProfile?.avatar && getData.picture) {
        await Profile.update(String(searchForProfile?.id), {
          avatar: getData.picture,
        });
      }

      if (searchForProfile) {
        setSession(ctx, searchForProfile);
      }

      if (!searchForProfile) {
        searchForProfile = await Profile.create({
          username: `${getData.given_name} ${getData.family_name}`,
          email: getData.email,
          avatar: getData.picture,
          confirmed: getData.verified_email,
        }).save();
        setSession(ctx, searchForProfile);
      }

      return searchForProfile;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
