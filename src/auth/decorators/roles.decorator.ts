import { SetMetadata } from "@nestjs/common"
import { Role } from "src/enums/roles"

export const ROLES_KEY = "role"

export const Roles = (...roles : [Role,...Role[]])=> SetMetadata(ROLES_KEY,roles)