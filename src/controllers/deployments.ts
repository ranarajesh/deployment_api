import { Request, Response, NextFunction } from 'express';
import Deployment from '../models/Deployment';
import asyncHandler from '../middleware/asyncHandler';
import CustomErrorResponse from '../utills/customErrorResponse';

/**
 * * getDeployments
 * * @desc    Get all Deployment list
 * * @route   GET /api/v1/deployments
 * * @access  Public
 */
export const getDeployments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let deployments = await Deployment.find().sort({ deployedAt: -1 });

    res.status(200).send({
      success: true,
      data: deployments,
    });
  }
);

/**
 * * createDeployment
 * * @desc    Create  Deployment
 * * @route   POST /api/v1/deployments
 * * @access  Public
 */

export const createDeployment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    let deployment = await Deployment.create(body);
    res.status(201).send({
      success: true,
      data: deployment,
    });
  }
);

/**
 * * getDeployment
 * * @desc    Get single Deployment list
 * * @route   GET /api/v1/deployments/:id
 * * @access  Public
 */
export const getDeployment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let deployment = await Deployment.findById(id);

    if (!deployment) {
      return next(
        new CustomErrorResponse(
          `Deployment id is not found with id : ${id}`,
          404
        )
      );
    }
    return res.status(200).send({
      success: true,
      data: deployment,
    });
  }
);

/**
 * * updateDeployment
 * * @desc    Update  Deployment
 * * @route   PUT  /api/v1/deployments/:id
 * * @access
 * @param id
 */

export const updateDeployment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { body } = req;
    let deployment = await Deployment.findById(id);

    if (!deployment) {
      return next(
        new CustomErrorResponse(
          `Deployment id is not found with id : ${id}`,
          404
        )
      );
    }

    if (body.version) {
      let versions = deployment?.version;
      let newVersion = body.version;
      let _isVersionExists = versions.includes(newVersion);

      // check for version already exists
      if (_isVersionExists) {
        return next(
          new CustomErrorResponse(
            `This version of Deployment is already exists `,
            404
          )
        );
      }
      body.version = versions?.concat([body.version]);
    }

    deployment = await Deployment.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: deployment,
    });
  }
);

/**
 * * deleteDeployment
 * * @desc    Delete  Deployment
 * * @route   Delete /api/v1/deployments
 * * @access
 * @param id
 */

export const deleteDeployment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let deployment = await Deployment.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      data: {},
    });
  }
);
