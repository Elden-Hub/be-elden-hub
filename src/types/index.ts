import { Profile } from "../entity/Profile";
import { ObjectType, Field } from "type-graphql";
import { Stream } from "stream";

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@ObjectType()
export class ApiResponse {
  @Field()
  message: string;

  @Field()
  status: boolean;
}

@ObjectType()
export class AuthResponse extends ApiResponse {
  @Field(() => Profile, { nullable: true })
  profile: Profile | null;
}
