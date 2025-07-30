import { BloodGroup, Gender, UserRole, UserStatus } from "@prisma/client";
import { z } from "zod";

const createAdminZodSchema = z.object({
  password: z.string({
    error: "Password is required",
  }),
  admin: z.object({
    name: z.string({
      error: "Name is required!",
    }),
    email: z.string({
      error: "Email is required!",
    }),
    contactNumber: z.string({
      error: "Contact Number is required!",
    }),
  }),
});

const createDoctorZodSchema = z.object({
  password: z.string({
    error: "Password is required",
  }),
  doctor: z.object({
    name: z
      .string({
        error: "Name is required!",
      })
      .min(1, "Name cannot be empty."),

    // Required email field with email validation
    email: z
      .string({
        error: "Email is required!",
      })
      .email("Please provide a valid email address."),

    // Optional string field for the profile photo URL
    profilePhoto: z.string().url("Please provide a valid URL.").optional(),

    // Optional string field for contact number
    contactNumber: z.string().optional(),

    // Optional string field for address
    address: z.string().optional(),

    // Required string field for registration number
    registrationNumber: z
      .string({
        error: "Registration number is required!",
      })
      .min(1, "Registration number cannot be empty."),

    // Required number field for appointment fee.
    // Using coerce to handle cases where the input might be a string (e.g., from a form).
    appointmentFee: z.coerce
      .number({
        error: "Appointment fee is required.",
      })
      .positive("Appointment fee must be a positive number."),

    // Required string field for qualification
    qualification: z
      .string({
        error: "Qualification is required!",
      })
      .min(1, "Qualification cannot be empty."),

    // Optional string field for current working place
    currentWorkingPlace: z.string().optional(),

    // Optional string field for designation
    designation: z.string().optional(),
  }),
});

const updateStatusZodSchema = z.object({
  status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED]),
});

const createPatientZodSchema = z.object({
  password: z.string({
    error: "Password is required",
  }),
  patient: z.object({
    name: z.string({
      error: "Name is required!",
    }),
    email: z.string({
      error: "Email is required!",
    }),
    contactNumber: z.string({
      error: "Contact Number is required!",
    }),
    address: z.string().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
    age: z.number({
      error: "Age is required",
    }),
    bloodGroup: z.enum([
      BloodGroup.A_POSITIVE,
      BloodGroup.A_NEGATIVE,
      BloodGroup.B_POSITIVE,
      BloodGroup.B_NEGATIVE,
      BloodGroup.O_POSITIVE,
      BloodGroup.O_NEGATIVE,
      BloodGroup.AB_POSITIVE,
      BloodGroup.AB_NEGATIVE,
    ]),
    height: z.number({
      error: "Height is required",
    }),
    weight: z.number({
      error: "Weight is required",
    }),
    guardian: z.object({
      name: z.string({
        error: "Guardian name is required!",
      }),
      email: z.string({
        error: "Guardian email is required!",
      }),
      contactNumber: z.string({
        error: "Guardian contact number is required!",
      }),
      address: z.string().optional(),
      gender: z.enum([Gender.MALE, Gender.FEMALE]),
      age: z.number({
        error: "Guardian age is required",
      }),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    }),
  }),
});

const updateMyProfileZodSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  contactNumber: z.string().optional(),
  address: z.string().optional(),
  gender: z.enum([Gender.MALE, Gender.FEMALE]).optional(),
  age: z.number().optional(),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  guardian: z
    .object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      contactNumber: z.string().optional(),
      address: z.string().optional(),
      gender: z.enum([Gender.MALE, Gender.FEMALE]).optional(),
      age: z.number().optional(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
    })
    .optional(),
  profilePhoto: z.string().url("Please provide a valid URL.").optional(),
});

export const userValidation = {
  createAdminZodSchema,
  createDoctorZodSchema,
  updateStatusZodSchema,
  createPatientZodSchema,
  updateMyProfileZodSchema,
};
