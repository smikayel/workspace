import logger from "jet-logger";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { RouteError } from "@src/other/classes";
import { userRepository } from "@src/index";
import { User } from "@src/repos/entities/User";
import PwdUtil from "../../util/PwdUtil";
import { Request, Response } from "express";
import { getTotalPages, PaginationRequest } from "@src/middleware/PaginationMiddleware";
import { DEFAULT_PAGE_SIZE } from "@src/constants/constants";

export const USER_NOT_FOUND_ERR = "User not found";
export const USER_CREATE_FAILED_ERR = "Failed to create user";
export const USER_UPDATE_FAILED_ERR = "Failed to update user";
export const USER_DELETE_FAILED_ERR = "Failed to delete user";
export const USER_CREATE_NOT_UNIQUE_ERR = "Account with this email already exist!"

export const createUser = async (req: Request, res: Response) => {
  const { email, username, password, role } = req.body;

  const user = new User();
  user.email = email;
  user.username = username;
  user.role = role;
  user.password = await PwdUtil.getHash(password);



  try {
    const persists = await userRepository.findOne({
      where: { email: email },
    });
    if (persists) {
      res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: USER_CREATE_NOT_UNIQUE_ERR });
      return 
    }

    const savedUser = await userRepository.save(user);
    res.status(HttpStatusCodes.CREATED).json(savedUser);
  } catch (error) {
    logger.err(error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: USER_CREATE_FAILED_ERR });
  }
};

export const getAllUsers = async (req: PaginationRequest, res: Response) => {
  try {
    const [users, count] = await userRepository.findAndCount({
      skip: req.skip,
      take: DEFAULT_PAGE_SIZE,
    });

    const totalPages = getTotalPages(count, DEFAULT_PAGE_SIZE);
    res.status(HttpStatusCodes.CREATED).json({
      users,
      totalPages,
      currentPage: req.pageNumber,
    });
  } catch (error) {
    logger.err(error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: USER_CREATE_FAILED_ERR });
  }
};

export async function updateOne(req: Request, res: Response): Promise<void> {
  if (!req.params.userId) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: "userId required in params" });
    return;
  }

  const persists = await userRepository.findOne({
    where: { id: +req.params.userId },
  });

  if (!persists) {
    res.status(HttpStatusCodes.NOT_FOUND).json({ error: USER_NOT_FOUND_ERR });
    return;
  }

  const { username, role, email } = req.body;

  try {
    const updatedUser = await userRepository.save({
      ...persists,
      username,
      role,
      email,
    });

    res.status(HttpStatusCodes.OK).json(updatedUser);
  } catch (err) {
    console.error(err);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: USER_UPDATE_FAILED_ERR });
  }
}

export async function _delete(req: Request, res: Response): Promise<void> {
  if (!req.params.userId)
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: "userId required in prams" });

  const persists = await userRepository.findOne({
    where: { id: +req.params.userId },
  });
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  // Delete user
  try {
    const deletedUser = await userRepository.remove(persists);
    res.status(HttpStatusCodes.CREATED).json(deletedUser);
  } catch (err) {
    logger.err(err);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: USER_DELETE_FAILED_ERR });
  }

  return;
}

// **** Export default **** //
export default {
  getAllUsers,
  createUser,
  updateOne,
  delete: _delete,
} as const;
