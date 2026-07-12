import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      error?.message ||
        "something went wrong while generating access and refresh token",
    );
  }
};
const registerUser = asyncHandler(async (req, res) => {
  // get user for frontend
  const { username, fullname, email, password } = req.body;
  // console.log("email: ", email, "fullname: ", fullname)
  console.log(req.body)

  // validation check
  if ([fullname, username, email, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  // check if user already exist : username, email
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User all already exist");
  }

  // create user object,create entry in db

  const user = await User.create({
    fullname,
    email,
    password,
    username: username.trim().toLowerCase(),
  });

  // remove password and refresh token
  const createUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  if (!createUser) {
    throw new ApiError(500, "something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createUser, "User Register Successfully"));
});

// LogIn User
const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!(username || email)) {
    throw new ApiError(400, "username or email is required");
  }

  if (!password) {
    throw new ApiError(400, "password is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  }).select("+password");
  if (!user) {
    throw new ApiError(404, "user dose not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "password is invalid");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
        },
        "User logged in Successfully",
      ),
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    },
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logout "));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const inComingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!inComingRefreshToken) {
    throw new ApiError(401, "Unathorized request");
  }

  const decodedToken = jwt.verify(
    inComingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  );
  const user = await User.findById(decodedToken?._id);
  if (!user) {
    throw new ApiError(401, "Invalid refresh Token");
  }

  if (inComingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "Refresh token is expire or used");
  }

  const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: newRefreshToken },
        "Access Token Refreshed Successfully",
      ),
    );
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword) {
    throw new ApiError(400, "Old Password is required");
  }
  if (!newPassword) {
    throw new ApiError(400, "New Password is required");
  }
  const user = await User.findById(req.user?._id).select("+password");
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Old Password is Invalid");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Old Password is change"));
});

// const forggetPasssword = asyncHandler(async (req, res) => {
//     const { email, password } = req.body
//     if (!email) {
//         throw new ApiError(400, "Email is required")
//     }

//     const user = await User.findOne(
//         {
//             email: email.trim().toLowerCase()
//         },
//         { new: true }
//     ).select("+password")

//     if (!user) {
//         throw new ApiError(404, "User does not exist with this email")
//     }

//     const resetToken = user.generateResetPasswordToken(password)
//     if (!resetToken) {
//         throw new ApiError(500, "Something went wrong while generating reset token")
//     }

//     const newPassword = jwt.verify(
//         resetToken,
//         process.env.RESET_PASSWORD_TOKEN_SECRET
//     )
//     if (!newPassword) {
//         throw new ApiError(400, "invalid or expires reset token")
//     }

//     user.password = password
//     await user.save({ validateBeforeSave: false })

//     const userWithNewpassword = await User.findByIdAndUpdate(
//         user._id,
//         {
//             $set: {
//                 password: password
//             }
//         },
//         {
//             validateBeforeSave: false
//         },
//         { new: true }
//     )

//     if (!userWithNewpassword) {
//         throw new ApiError(500, "something went wrong while updating new password")
//     }

//     return res.status(200)
//         .json(new ApiResponse(200, {}, "Old Password is change"))

// })

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(200, req.User, "Current User Fetched Succesfully");
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body || {};

  if (!fullname || !email) {
    throw new ApiError(400, "All Field are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullname,
        email,
      },
    },
    { new: true },
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account Details Updated Successfully"));
});

export {
  registerUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  // forggetPasssword,
};
