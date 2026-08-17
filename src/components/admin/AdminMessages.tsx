import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Mail, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  deleteRecord,
  listRecords,
  updateRecord,
} from "@/lib/portfolio/portfolio.api";

import { idOf, text, type Rec } from "@/lib/portfolio/portfolio.content";

import { PageHeader } from "./AdminDashboard";

export function Messages() {
  const getRecords = useServerFn(listRecords);
  const doUpdate = useServerFn(updateRecord);
  const doDelete = useServerFn(deleteRecord);

  const [pendingId, setPendingId] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["records", "messages"],
    queryFn: async () => {
      const result = await getRecords({
        data: {
          key: "messages",
        },
      });

      return result.records as Rec[];
    },
  });

  async function markStatus(record: Rec, status: "read" | "unread") {
    const id = idOf(record);

    if (pendingId) {
      return;
    }

    setPendingId(id);

    try {
      await doUpdate({
        data: {
          key: "messages",
          id,
          values: {
            status,
          },
        },
      });

      await refetch();

      toast.success(status === "read" ? "Marked as read" : "Marked as unread");
    } catch (error) {
      toast.error("Could not update message", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setPendingId(null);
    }
  }

  async function remove(record: Rec) {
    const id = idOf(record);

    if (pendingId) {
      return;
    }

    if (!window.confirm("Delete this message permanently?")) {
      return;
    }

    setPendingId(id);

    try {
      await doDelete({
        data: {
          key: "messages",
          id,
        },
      });

      await refetch();

      toast.success("Message deleted");
    } catch (error) {
      toast.error("Could not delete message", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setPendingId(null);
    }
  }

  return (
    <section>
      <PageHeader
        title="Messages"
        description="Messages submitted through your portfolio contact form."
      />

      <div className="mt-6 overflow-hidden rounded-xl border border-border">
        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <div className="p-12 text-center">
            <p className="font-medium">Could not load messages</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Something went wrong while loading your messages.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-4 rounded-lg border border-border px-4 py-2 text-sm hover:bg-surface-light"
            >
              Try again
            </button>
          </div>
        ) : !data?.length ? (
          <div className="p-12 text-center">
            <Mail className="mx-auto size-8 text-muted-foreground" />

            <p className="mt-3 font-medium">No messages yet</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Contact form submissions will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {data.map((message) => {
              const id = idOf(message);
              const unread = text(message["status"]) === "unread";
              const isPending = pendingId === id;

              return (
                <article
                  key={id}
                  className={`p-5 ${unread ? "bg-primary/5" : ""}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">
                          {text(message["subject"], "No subject")}
                        </h3>

                        {unread && (
                          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                            UNREAD
                          </span>
                        )}
                      </div>

                      <p className="mt-1 wrap-break-word text-sm text-muted-foreground">
                        {text(message["name"])} · {text(message["email"])}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        disabled={Boolean(pendingId)}
                        onClick={() =>
                          markStatus(message, unread ? "read" : "unread")
                        }
                        className="rounded-lg border border-border px-3 py-2 text-xs transition-colors hover:bg-surface-light disabled:opacity-50"
                      >
                        {isPending
                          ? "Updating..."
                          : unread
                            ? "Mark read"
                            : "Mark unread"}
                      </button>

                      <button
                        type="button"
                        disabled={Boolean(pendingId)}
                        onClick={() => remove(message)}
                        className="rounded-lg border border-destructive/20 p-2 text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
                        aria-label="Delete message"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>

                  <p className="mt-4 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-muted-foreground">
                    {text(message["message"])}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
