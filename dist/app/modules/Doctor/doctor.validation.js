"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            error: 'Email is required',
        }),
        name: zod_1.z.string({
            error: 'Name is required',
        }),
        profilePhoto: zod_1.z.string({
            error: 'Profile Photo is required',
        }),
        contactNumber: zod_1.z.string({
            error: 'Contact Number is required',
        }),
        registrationNumber: zod_1.z.string({
            error: 'Registration Number is required',
        }),
        experience: zod_1.z.number({
            error: 'Experience is required',
        }),
        gender: zod_1.z.string({
            error: 'Gender is required',
        }),
        apointmentFee: zod_1.z.number({
            error: 'Blood group is required',
        }),
        qualification: zod_1.z.string({
            error: 'Apointment Fee is required',
        }),
        currentWorkingPlace: zod_1.z.string({
            error: 'Current Working Place is required',
        }),
        designation: zod_1.z.string({
            error: 'Designation is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        profilePhoto: zod_1.z.string().optional(),
        contactNumber: zod_1.z.string().optional(),
        registrationNumber: zod_1.z.string().optional(),
        experience: zod_1.z.number().optional(),
        gender: zod_1.z.string().optional(),
        apointmentFee: zod_1.z.number().optional(),
        qualification: zod_1.z.string().optional(),
        currentWorkingPlace: zod_1.z.string().optional(),
        designation: zod_1.z.string().optional(),
    }),
});
exports.DoctorValidation = {
    create,
    update,
};
