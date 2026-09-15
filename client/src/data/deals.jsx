import { z } from "zod";

const schema = z.object({
  title: z.string().max(69, "Title too long, use the notes").optional(),
  assignee: z
    .object({
      name: z.string().trim().optional(),
      avatar: z.string().url().optional(),
    })
    .optional(),
  contact: z
    .object({
      firstName: z.string().trim().optional(),
      lastName: z.string().trim().optional(),
      fullName: z.string().trim().optional(),
      email: z.string().email().optional(),
      avatar: z.string().url().optional(),
      phone: z.string().trim().optional(),
    })
    .optional(),
  company: z
    .object({
      name: z.string(),
    })
    .optional(),
  stage: z.enum([
        "New Lead",
        "Qualified Lead",
        "In Draft",
        "Proposal Sent",
        "Negotiation",
        "Deal Won",
        "Deal Lost",
      ]).optional(),
  createdAt: z.date().optional(),
  createdBy: z.string().optional(),
  modifiedAt: z.date().optional(),
  modifiedBy: z.string().optional(),
  amount: z
    .string()
    .regex(/[0-9]/, ":) really ?")
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .optional(),
  closingDate: z.date().optional(),
  nextStep: z.string().max(50, "Too long.").optional(),
  leadSource: z
    .enum([
      "Website",
      "Email Campaign",
      "Social Media",
      "Referral",
      "Advertisement",
      "Event",
      "Cold Call",
      "Direct Mail",
      "Search Engine",
      "Partner",
    ])
    .optional(),
  notes: z.string().max(255, "Too long,").optional(),
  attachements: z.array(z.object({
    name: z.string().trim(),
    type: z.string().trim(),
    size: z.number(),
    url: z.string().url(),
  })).optional(),
});

export const sources = [
  { id: 1, label: "Website", value: "Website" },
  { id: 2, label: "Email Campaign", value: "Email Campaign" },
  { id: 3, label: "Social Media", value: "Social Media" },
  { id: 4, label: "Referral", value: "Referral" },
  { id: 5, label: "Advertisement", value: "Advertisement" },
  { id: 6, label: "Event", value: "Event" },
  { id: 7, label: "Cold Call", value: "Cold Call" },
  { id: 8, label: "Direct Mail", value: "Direct Mail" },
  { id: 9, label: "Search Engine", value: "Search Engine" },
  { id: 10, label: "Partner", value: "Partner" },
];

export const stages = [
  {
    id: 1,
    value: "New Lead",
    label: "New Lead",
    styleWhenCompleted: "bg-[#2e2e2e] text-neutral-20 hover:bg-[#2e2e2e] hover:text-neutral-20 rounded-l-full",
  },
  {
    id: 2,
    value: "Qualified Lead",
    label: "Qualified Lead",
    styleWhenCompleted: "bg-[#2e2e2e] text-neutral-20 hover:bg-[#2e2e2e] hover:text-neutral-20",
  },
  {
    id: 3,
    value: "In Draft",
    label: "In Draft",
    styleWhenCompleted: "bg-[#2e2e2e] text-neutral-20 hover:bg-[#2e2e2e] hover:text-neutral-20",
  },
  {
    id: 4,
    value: "Proposal Sent",
    label: "Proposal Sent",
    styleWhenCompleted: "bg-[#2e2e2e] text-neutral-20 hover:bg-[#2e2e2e] hover:text-neutral-20",
  },
  {
    id: 5,
    value: "Negotiation",
    label: "Negotiation",
    styleWhenCompleted: "bg-[#2e2e2e] text-neutral-20 hover:bg-[#2e2e2e] hover:text-neutral-20",
  },
  {
    id: 6,
    value: "Deal Won",
    label: "Deal Won",
    styleWhenCompleted: "bg-[#2e2e2e] text-white hover:bg-[#19870e] hover:text-neutral-20",
  },
  {
    id: 7,
    value: "Deal Lost",
    label: "Deal Lost",
    styleWhenCompleted: "bg-[#2e2e2e] rounded-r-full text-white hover:bg-[#ab0909] hover:text-neutral-20",
  },
];

   export const assignees = [
  {
    name: "Aarav Sharma",
    avatar: "https://loremflickr.com/640/480/people?lock=7955103487098880",
  },
  {
    name: "Priya Verma",
    avatar: "https://loremflickr.com/640/480/people?lock=3449100592742400",
  },
  {
    name: "Rohit Kumar",
    avatar: "https://loremflickr.com/640/480/people?lock=7225913890570240",
  },
  {
    name: "Neha Singh",
    avatar: "https://loremflickr.com/640/480/people?lock=2489980026880000",
  },
  {
    name: "Amit Mishra",
    avatar: "https://loremflickr.com/640/480/people?lock=2719769633488896",
  },
  {
    name: "Sanjay Kapoor",
    avatar: "https://loremflickr.com/640/480/people?lock=8926477493993472",
  },
  {
    name: "Deepak Patel",
    avatar: "https://loremflickr.com/640/480/people?lock=1565734253625344",
  },
  {
    name: "Kavya Tiwari",
    avatar: "https://loremflickr.com/640/480/people?lock=1091105888141312",
  },
];
export default schema;
