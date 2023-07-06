import { Request, Response } from "express";
import { PaginationRequest } from "@src/middleware/PaginationMiddleware";
import { userRepository, workspaceRepository } from "@src/index";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import logger from "jet-logger";
import { Workspace } from "@src/repos/entities/Workspace";
import { generateUniqueSlug } from "./workspace.helpers";
import { RouteError } from "@src/other/classes";

export const WORKSPACE_CREATE_FAILED_ERR = "Failed to create workspace";
export const WORKSPACE_GET_FAILED_ERR = "Failed to get all workspaces";
export const WORKSPACE_NOT_FOUND_ERR = "Workspace not found";
export const WORKSPACE_DELETE_FAILED_ERR = "Workspace deletion faild"
export const INTERNAL_ERROR = "internal error"

export const createWorkspace = async (req: Request, res: Response) => {
  const { name, slug, userId } = req.body;

  try {
    const user =  await userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: `user with id(${userId}) not found` });
      return
    }

    const workspace = new Workspace();
    workspace.name = name
    workspace.slug = slug
    workspace.user = user

    const persists = await workspaceRepository.findOne({
      where: { slug },
    });
    if (persists) {

      const suggestion = generateUniqueSlug(slug)

      res
      .status(HttpStatusCodes.OK)
      .json({ suggestion });
      return 
    } 
    const savedWorkspace = await workspaceRepository.save(workspace);
    res.status(HttpStatusCodes.CREATED).json(savedWorkspace);

  } catch (error) {
    logger.err(error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: WORKSPACE_CREATE_FAILED_ERR });
  }
};

export const getAllWorkspaces = async (req: PaginationRequest, res: Response) => {
  try {
    const workspaces = await workspaceRepository.find();
    res.status(HttpStatusCodes.OK).json({
      workspaces
    });
  } catch (error) {
    logger.err(error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: WORKSPACE_GET_FAILED_ERR });
  }
};

export async function _delete(req: Request, res: Response): Promise<void> {
  if (!req.params.workspaceId)
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: "workspaceId required in prams" });

  const persists = await workspaceRepository.findOne({
    where: { id: +req.params.workspaceId },
  });
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, WORKSPACE_NOT_FOUND_ERR);
  }
  // Delete workspace
  try {
    const deletedWorkspace = await workspaceRepository.remove(persists);
    res.status(HttpStatusCodes.CREATED).json(deletedWorkspace);
  } catch (err) {
    logger.err(err);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: WORKSPACE_DELETE_FAILED_ERR });
  }

  return;
}

export async function checkWorkspaceAvalability(req: Request, res: Response): Promise<void> {
  if (!req.params.workspaceSlug)
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: "workspaceId required in prams" });

  const persists = await workspaceRepository.findOne({
    where: { slug: req.params.workspaceSlug },
  });
  if (!persists) {
    res.status(HttpStatusCodes.OK).json({message: "workspace slug avalable"});
    return
  }

  try {
    const suggestion = generateUniqueSlug(req.params.workspaceSlug)
    res.status(HttpStatusCodes.OK).json({suggestion});
  } catch (err) {
    logger.err(err);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: INTERNAL_ERROR });
  }
  return;
}


// **** Export default **** //
export default {
  getAllWorkspaces,
  createWorkspace,
  checkWorkspaceAvalability,
  delete: _delete,
} as const;
