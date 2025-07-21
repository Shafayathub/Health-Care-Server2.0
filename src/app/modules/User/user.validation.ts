import { Gender, UserRole, UserStatus } from "@prisma/client";
import { z } from "zod";

const createAdminZodSchema = z.object({
    password: z.string({
        error: "Password is required"
    }),
    admin: z.object({
        name: z.string({
            error: "Name is required!"
        }),
        email: z.string({
            error: "Email is required!"
        }),
        contactNumber: z.string({
            error: "Contact Number is required!"
        })
    })
});

const createDoctorZodSchema = z.object({
    password: z.string({
        error: "Password is required"
    }),
    doctor: z.object({
        name: z.string({
            error: "Name is required!"
        }),
        email: z.string({
            error: "Email is required!"
        }),
        contactNumber: z.string({
            error: "Contact Number is required!"
        }),
        address: z.string().optional(),
        registrationNumber: z.string({
            error: "Reg number is required"
        }),
        experience: z.number().optional(),
        gender: z.enum([Gender.MALE, Gender.FEMALE]),
        appointmentFee: z.number({
            error: "appointment fee is required"
        }),
        qualification: z.string({
            error: "quilification is required"
        }),
        currentWorkingPlace: z.string({
            error: "Current working place is required!"
        }),
        designation: z.string({
            error: "Designation is required!"
        })
    })
});

const updateStatusZodSchema = z.object({

    body: z.object({
        status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED])
    })
})

const createPatientZodSchema = z.object({
    password: z.string({
        error: "Password is required"
    }),
    patient: z.object({
        name: z.string({
            error: "Name is required!"
        }),
        email: z.string({
            error: "Email is required!"
        }),
        contactNumber: z.string({
            error: "Contact Number is required!"
        }),
        address: z.string().optional(),
        gender: z.enum([Gender.MALE, Gender.FEMALE]),
        age: z.number({
            error: "Age is required"
        }),
        bloodGroup: z.enum([
            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-"
        ]),
        height: z.number({
            error: "Height is required"
        }),
        weight: z.number({
            error: "Weight is required"
        }),
        guardian: z.object({
            name: z.string({
                error: "Guardian name is required!"
            }),
            email: z.string({
                error: "Guardian email is required!"
            }),
            contactNumber: z.string({
                error: "Guardian contact number is required!"
            }),
            address: z.string().optional(),
            gender: z.enum([Gender.MALE, Gender.FEMALE]),
            age: z.number({
                error: "Guardian age is required"
            }),
            bloodGroup: z.enum([
                "A+",
                "A-",
                "B+",
                "B-",
                "AB+",
                "AB-",
                "O+",
                "O-"
            ]),
        }),
    })
})


export const userValidation = {
    createAdminZodSchema,
    createDoctorZodSchema,
    updateStatusZodSchema,
    createPatientZodSchema,
}