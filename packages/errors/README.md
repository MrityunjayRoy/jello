# errors

Shared, zero-dependency, type-safe error handling primitives for the Jello monorepo.

The package provides a discriminated-union `Result<T, E>` type (instead of throwing
plain `Error`s anywhere in the codebase) plus a hierarchy of typed `AppError`
subclasses that carry an HTTP `status` and a machine-readable `code`.

## Usage

```ts
import { ok, err, NotFoundError, type Result } from "errors";

type Org = { id: string; name: string };

export function getOrg(id: string): Result<Org> {
  const org = await repo.findOrgById(id);
  if (!org) {
    return err(new NotFoundError({ message: "Org not found" }));
  }
  return ok(org);
}

const result = getOrg("abc");
if (result.success) {
  // result.data is typed Org
} else {
  // result.error is typed AppError, result.error.status / .code available
}
```

## Error subclasses

- `BadRequestError` (400 / `BAD_REQUEST`)
- `ValidationError` (400 / `VALIDATION_ERROR`)
- `UnauthorizedError` (401 / `UNAUTHORIZED`)
- `ForbiddenError` (403 / `FORBIDDEN`)
- `NotFoundError` (404 / `NOT_FOUND`)
- `ConflictError` (409 / `CONFLICT`)
- `InternalServerError` (500 / `INTERNAL_ERROR`)

All accept `AppErrorOptions` (`{ message?, code?, details?, cause? }`).

## Helpers

- `ok<T>(data)` / `err<E>(error)` — construct results.
- `isOk(result)` / `isErr(result)` — type guards.
- `match(result, { ok, err })` — exhaustive branch handling.
- `unwrap(result)` — returns `data` or throws the stored `AppError`.
- `fromThrowable(fn, mapError?)` — wraps throwing code; `mapError` lets you map
  known errors (e.g. zod `ZodError` → `ValidationError`, Prisma `P2002` → `ConflictError`).
- `toAppError(error, fallback?)` — normalizes any error into an `AppError`.

## Development

```bash
bun install
```

Type-check:

```bash
bunx tsc --noEmit
```
