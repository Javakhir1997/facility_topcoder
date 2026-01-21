import {STATUS_COLOR_LIST} from "@app/shared";

export default function useStatus(status: keyof typeof STATUS_COLOR_LIST) {
    return STATUS_COLOR_LIST[status] || {background: "var(--color-gray-light-1)", color: "var(--color-gray-4)"}
}