import { UserStatus } from "@prisma/client";
import bcrypt from 'bcryptjs'
import prisma from "../../utility/prisma";
import { jwtHelpers } from "../../utility/jwtHelper";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";

const loginUser = async (payload: {
    email: string,
    password: string
}) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    });

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);

    if (!isCorrectPassword) {
        throw new Error("Password incorrect!")
    }
    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        config.jwt.accessTokenSecret as string,
        config.jwt.accessTokenExpiresIn as string
    );

    const refreshToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        config.jwt.refreshTokenSecret as string,
        config.jwt.refreshTokenExpiresIn as string
    );

    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange
    };
};


const refreshToken = async (token: string) => {
    let decodedData;
    try {
        decodedData = jwtHelpers.verifyToken(token, 'abcdefghgijklmnop');
    }
    catch (err) {
        throw new Error("You are not authorized!")
    }

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
            status: UserStatus.ACTIVE
        }
    });

    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        config.jwt.accessTokenSecret as string,
        config.jwt.accessTokenExpiresIn as string
    );

    return {
        accessToken,
        needPasswordChange: userData.needPasswordChange
    };

}

const changePassword = async (user: JwtPayload, payload: {
    oldPassword: string,
    newPassword: string
}) =>{
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: UserStatus.ACTIVE
        }
    })
    const isCorrectPassword: boolean = await bcrypt.compare(payload.oldPassword, userData.password);

    if (!isCorrectPassword) {
        throw new Error("Password incorrect!")
    }
    const hashedPassword: string = await bcrypt.hash(payload.newPassword, Number(config.saltRound));
    await prisma.user.update({
        where: {
            email: user.email
        },
        data: {
            password: hashedPassword,
            needPasswordChange: false
        }
    })
    return {
        message: "Password changed successfully!"
    }
}

export const AuthServices = {
    loginUser,
    refreshToken,
    changePassword
}