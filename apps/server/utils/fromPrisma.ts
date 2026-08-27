import {
    ConflictError,
    InternalServerError,
    NotFoundError,
    err,
    ok,
    type Result,
} from "errors";
import { PrismaClientKnownRequestError } from "db/client";

interface FromPrismaOptions {
    notFoundMessage?: string;
}

export const fromPrisma = async <T>(
    fn: () => Promise<T>,
    options: FromPrismaOptions = {},
): Promise<Result<T>> => {
    try {
        return ok(await fn());
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2025":
                    return err(new NotFoundError({
                        message: options.notFoundMessage ?? "Record not found",
                        cause: error,
                    }));
                case "P2002":
                    return err(new ConflictError({
                        message: "A record with this value already exists",
                        details: error.meta,
                        cause: error,
                    }));
                case "P2003":
                    return err(new ConflictError({
                        message: "Related record not found",
                        cause: error,
                    }));
                default:
                    return err(new InternalServerError({ cause: error }));
            }
        }
        return err(new InternalServerError({ cause: error }));
    }
};
