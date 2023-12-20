/* eslint-disable */
import { Injectable } from "@nestjs/common";
import { AuthModel } from "../models/auth.model";
import { UserDto } from "../dto/user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthProvider {
  constructor(private jwtService: JwtService) {}

  public async findUser(data: { token: string }): Promise<AuthModel> {
    const connectedUser = this.jwtService.verify(data.token, {
      secret: "jhgiV876sdfhiuFYSUFPNJaiFIUsbfjh87Sf98sba76fadfvahdafo7isa87690SAFGU",
    })
    const res: any = await AuthModel.findOne({
      where: {
        id: connectedUser.id
      },
    });

    return res.id;
  }

  public async createUser(data: UserDto): Promise<AuthModel> {
    return await AuthModel.findOne({
      where: {
        login: data.login,
      },
    }).then(async (res: any) => {
      if (res != null) {
        return res;
      } else {
        return await AuthModel.create({
          login: data.login,
          password: data.password,
        });
      }
    });
  }

  public async loginUser(data: UserDto): Promise<string> {
    return await AuthModel.findOne({
      where: {
        login: data.login,
        password: data.password,
      },
    }).then(async (res: any) => {
      if (res) {
        return await this.jwtService.signAsync({
          sub: res.login,
          id: res.id
        });
      } else {
        throw new Error("User not defined.");
      }
    });
  }
}