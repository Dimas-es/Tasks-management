import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "fitur",
    label: "Fitur",
  },
  {
    value: "dokumentasi",
    label: "Dokumentasi",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Belum Dikerjakan",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "Sedang Dikerjakan",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Selesai",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Dibatalkan",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Mendesak",
    value: "urgent",
    icon: ArrowUpIcon,
  },
  {
    label: "Tidak Mendesak",
    value: "not-urgent",
    icon: ArrowLeftIcon,
  },
  {
    label: "Penting",
    value: "important",
    icon: ArrowRightIcon,
  },
  {
    label: "Tidak Penting",
    value: "not-important",
    icon: ArrowDownIcon,
  },
];
